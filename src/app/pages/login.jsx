import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Fingerprint, Mail, AlertCircle } from "lucide-react";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleCredentialLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please fill in the email field.");
      return;
    }

    console.log("Login with credentials:", { email });

    // Once backend done, call api to navig to dashboard
  };

  const handlePasskeyLogin = async () => {
    try {
      // WebAuthn API
      const credential = await navigator.credentials.get({
        publicKey: {
          challenge: crypto.getRandomValues(new Uint8Array(32)),
          timeout: 60000,
          rpId: window.location.hostname,
          userVerification: "preferred",
        },
      });
      console.log("Passkey credential received:", credential);
      // Once backend done, call api to navig to dashboard
    } catch (err) {
      console.error("Passkey authentication failed:", err);
      setError("Passkey login failed. Please try again.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card-inner">

          <div className="auth-brand">
            <img
              src="/z_taslogo.png"
              alt="ZTAS Logo"
              className="auth-brand-logo"
            />
            <h1>ZTAS Admin Console</h1>
            <p>Sign in to continue</p>
          </div>

          {/* credentials form */}
          <form onSubmit={handleCredentialLogin} noValidate>
            {error && (
              <div className="auth-error-alert" style={{
                backgroundColor: "rgba(255, 59, 92, 0.1)",
                border: "1px solid rgba(255, 59, 92, 0.2)",
                color: "#FF3B5C",
                padding: "10px",
                borderRadius: "8px",
                marginBottom: "20px",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}>
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}
            <div className="auth-field">
              <label htmlFor="login-email">Email Address</label>
              <div className="auth-input-wrapper">
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

          </form>

          {/* passkey login buttonn */}
          <button
            type="button"
            className="auth-passkey-btn"
            onClick={handlePasskeyLogin}
            id="login-passkey"
          >
            <Fingerprint size={20} />
            Sign in with Passkey
          </button>

          {/* footer */}
          <div className="auth-footer">
            Don't have an account?{" "}
            <Link to="/register">Create one</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
