/** Base64url decode → ArrayBuffer */
export function base64UrlToBuffer(b64url) {
  const normalized = b64url.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized + "=".repeat((4 - (normalized.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

/** ArrayBuffer → base64url */
export function bufferToBase64Url(buf) {
  const bytes = new Uint8Array(buf);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

/** Unwrap API `creation_data` (string, { publicKey }, or flat options). */
function unwrapCreationOptionsInput(input) {
  if (input == null) return null;
  let raw = input;
  if (typeof raw === "string") {
    try {
      raw = JSON.parse(raw);
    } catch {
      return null;
    }
  }
  if (typeof raw !== "object") return null;
  // go-webauthn / many servers return { publicKey: { challenge, rp, user, ... } }
  if (raw.publicKey && typeof raw.publicKey === "object") {
    return raw.publicKey;
  }
  return raw;
}

function normalizeChallenge(challenge) {
  if (challenge == null) return undefined;
  if (challenge instanceof ArrayBuffer) return challenge;
  if (ArrayBuffer.isView(challenge)) return challenge.buffer.slice(
    challenge.byteOffset,
    challenge.byteOffset + challenge.byteLength,
  );
  if (typeof challenge === "string") return base64UrlToBuffer(challenge);
  if (Array.isArray(challenge)) return new Uint8Array(challenge).buffer;
  if (typeof challenge === "object" && Array.isArray(challenge.data)) {
    return new Uint8Array(challenge.data).buffer;
  }
  return undefined;
}

function normalizeUserId(userId) {
  if (userId == null) return userId;
  if (typeof userId === "string") return base64UrlToBuffer(userId);
  if (Array.isArray(userId)) return new Uint8Array(userId).buffer;
  if (typeof userId === "object" && Array.isArray(userId.data)) {
    return new Uint8Array(userId.data).buffer;
  }
  return userId;
}

/** Server JSON → `navigator.credentials.create({ publicKey })` options */
export function parseCreationOptionsFromJSON(input) {
  const json = unwrapCreationOptionsInput(input);
  if (!json || typeof json !== "object") {
    throw new Error("Invalid WebAuthn creation options from server.");
  }
  const opt = { ...json };
  const ch = normalizeChallenge(opt.challenge);
  if (!ch) {
    throw new Error("Server creation options are missing challenge (check creation_data shape).");
  }
  opt.challenge = ch;
  if (opt.user && typeof opt.user === "object") {
    opt.user = { ...opt.user, id: normalizeUserId(opt.user.id) };
  }
  if (Array.isArray(opt.excludeCredentials)) {
    opt.excludeCredentials = opt.excludeCredentials.map((c) => ({
      ...c,
      id: typeof c.id === "string" ? base64UrlToBuffer(c.id) : normalizeUserId(c.id) ?? c.id,
    }));
  }
  return opt;
}

function unwrapRequestOptionsInput(input) {
  if (input == null) return null;
  let raw = input;
  if (typeof raw === "string") {
    try {
      raw = JSON.parse(raw);
    } catch {
      return null;
    }
  }
  if (typeof raw !== "object") return null;
  if (raw.publicKey && typeof raw.publicKey === "object") {
    return raw.publicKey;
  }
  return raw;
}

/** Server JSON → `navigator.credentials.get({ publicKey })` options */
export function parseRequestOptionsFromJSON(input) {
  const json = unwrapRequestOptionsInput(input);
  if (!json || typeof json !== "object") {
    throw new Error("Invalid WebAuthn request options from server.");
  }
  const opt = { ...json };
  const ch = normalizeChallenge(opt.challenge);
  if (!ch) {
    throw new Error("Server assertion options are missing challenge.");
  }
  opt.challenge = ch;
  if (Array.isArray(opt.allowCredentials)) {
    opt.allowCredentials = opt.allowCredentials.map((c) => ({
      ...c,
      id: typeof c.id === "string" ? base64UrlToBuffer(c.id) : normalizeUserId(c.id) ?? c.id,
    }));
  }
  return opt;
}

/** PublicKeyCredential → JSON body for go-webauthn finish (no outer wrapper). */
export function publicKeyCredentialToRegistrationJSON(credential) {
  if (typeof credential.toJSON === "function") return credential.toJSON();
  const response = credential.response;
  return {
    id: credential.id,
    rawId: bufferToBase64Url(credential.rawId),
    response: {
      clientDataJSON: bufferToBase64Url(response.clientDataJSON),
      attestationObject: bufferToBase64Url(response.attestationObject),
      transports: response.getTransports?.() ?? undefined,
    },
    type: credential.type,
    clientExtensionResults: credential.getClientExtensionResults?.() ?? {},
  };
}

export function publicKeyCredentialToAuthenticationJSON(credential) {
  if (typeof credential.toJSON === "function") return credential.toJSON();
  const response = credential.response;
  const out = {
    id: credential.id,
    rawId: bufferToBase64Url(credential.rawId),
    response: {
      clientDataJSON: bufferToBase64Url(response.clientDataJSON),
      authenticatorData: bufferToBase64Url(response.authenticatorData),
      signature: bufferToBase64Url(response.signature),
    },
    type: credential.type,
    clientExtensionResults: credential.getClientExtensionResults?.() ?? {},
  };
  if (response.userHandle && response.userHandle.byteLength > 0) {
    out.response.userHandle = bufferToBase64Url(response.userHandle);
  }
  return out;
}
