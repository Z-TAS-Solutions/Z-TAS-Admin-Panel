import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Fingerprint, Mail, AlertCircle } from "lucide-react";
import { webauthnService } from "../../services/webauthn";
import { parseRequestOptionsFromJSON } from "../../lib/webAuthnHelpers";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const apiMessage = (err) =>
    err?.response?.data?.message ||
    err?.data?.message ||
    err?.message ||
    "Passkey login failed.";

  function isNoCredentialsError(err) {
    const msg = String(err?.response?.data?.message || err?.data?.message || err?.message || "");
    return /no credential/i.test(msg);
  }

  const handlePasskeyLogin = async () => {
    setError("");
    setLoading(true);
    try {
      if (!email.trim()) {
        throw new Error("Please enter your email before signing in with a passkey.");
      }
      if (!window.isSecureContext || !window.PublicKeyCredential || !navigator.credentials?.get) {
        throw new Error("Passkeys require HTTPS or localhost with WebAuthn support.");
      }

      const trimmed = email.trim();
      let beginRes;
      try {
        beginRes = await webauthnService.loginBegin({ username: trimmed });
      } catch (firstErr) {
        if (isNoCredentialsError(firstErr)) {
          beginRes = await webauthnService.loginBegin({});
        } else {
          throw firstErr;
        }
      }
      const inner = beginRes?.data ?? beginRes;
      const sessionToken = inner?.session_token ?? beginRes?.data?.session_token;
      const assertionData = inner?.assertion_data ?? beginRes?.data?.assertion_data;
      if (!sessionToken || !assertionData) {
        throw new Error("Login could not start (missing session or options).");
      }

      const publicKey = parseRequestOptionsFromJSON(assertionData);
      const credential = await navigator.credentials.get({ publicKey });
      if (!credential) {
        throw new Error("No passkey was selected.");
      }

      const finishRes = await webauthnService.loginFinish(sessionToken, credential);
      const token =
        finishRes?.data?.token ??
        finishRes?.token;
      if (!token) {
        throw new Error("Login completed but no token was returned.");
      }
      localStorage.setItem("token", token);
      localStorage.removeItem("access_token");
      navigate("/dashboard");
    } catch (err) {
      console.error("Passkey authentication failed:", err);
      setError(apiMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card-inner">
          <div className="auth-brand">
            <img src="/z_taslogo.png" alt="ZTAS Logo" className="auth-brand-logo" />
            <h1>ZTAS Admin Console</h1>
            <p>Sign in to continue</p>
          </div>

          {error && (
            <div
              className="auth-error-alert"
              style={{
                backgroundColor: "rgba(255, 59, 92, 0.1)",
                border: "1px solid rgba(255, 59, 92, 0.2)",
                color: "#FF3B5C",
                padding: "10px",
                borderRadius: "8px",
                marginBottom: "20px",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <div className="auth-field">
            <label htmlFor="login-email">Email Address</label>
            <div className="auth-input-wrapper">
              <Mail size={18} />
              <input
                id="login-email"
                type="email"
                className="auth-input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                required
                autoComplete="email"
                aria-label="Email Address"
              />
            </div>
          </div>

          <button
            type="button"
            className="auth-passkey-btn"
            onClick={handlePasskeyLogin}
            id="login-passkey"
            disabled={loading}
          >
            <Fingerprint size={20} />
            {loading ? "Signing in…" : "Sign in with Passkey"}
          </button>

          <div className="auth-footer">
            Don&apos;t have an account? <Link to="/register">Create one</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
