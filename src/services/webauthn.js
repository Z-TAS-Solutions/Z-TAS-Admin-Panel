import apiClient from "../lib/apiClient";
import {
  publicKeyCredentialToAuthenticationJSON,
  publicKeyCredentialToRegistrationJSON,
} from "../lib/webAuthnHelpers";

function apiBase() {
  return (import.meta.env.VITE_API_URL || apiClient.defaults.baseURL || "").replace(/\/$/, "");
}

/** Raw JSON string body (credential protocol object), per go-webauthn finish handlers */
async function postRawJson(path, bodyString, extraHeaders = {}) {
  const res = await fetch(`${apiBase()}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...extraHeaders,
    },
    body: bodyString,
  });
  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { message: text };
  }
  if (!res.ok) {
    const msg = data?.message || data?.error || res.statusText || "Request failed";
    const err = new Error(typeof msg === "string" ? msg : JSON.stringify(msg));
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

export const webauthnService = {
  registerBegin: (email) =>
    apiClient.post("/webauthn/register/begin", { email }).then((res) => res.data),

  registerFinish: (sessionToken, credential, authenticatorName) => {
    const body = JSON.stringify(publicKeyCredentialToRegistrationJSON(credential));
    const headers = { "X-Session-Token": sessionToken };
    if (authenticatorName) headers["X-Authenticator-Name"] = authenticatorName;
    return postRawJson("/webauthn/register/finish", body, headers);
  },

  /** `payload` is `{ username }` or `{}` for usernameless / discoverable passkeys */
  loginBegin: (payload) =>
    apiClient.post("/webauthn/login/begin", payload).then((res) => res.data),

  loginFinish: (sessionToken, credential) => {
    const body = JSON.stringify(publicKeyCredentialToAuthenticationJSON(credential));
    return postRawJson("/webauthn/login/finish", body, {
      "X-Session-Token": sessionToken,
    });
  },
};
