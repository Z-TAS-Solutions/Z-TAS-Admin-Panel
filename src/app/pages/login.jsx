import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff, Fingerprint, Mail, Lock, AlertCircle } from "lucide-react";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleCredentialLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    console.log("Login with credentials:", { email, password });

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

            <div className="auth-field">
              <label htmlFor="login-password">Password</label>
              <div className="auth-input-wrapper">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  className="auth-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError("");
                  }}
                  required
                  autoComplete="current-password"
                  aria-label="Password"
                  style={{ paddingRight: 44 }}
                />
                <button
                  type="button"
                  className="auth-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="auth-submit"
              id="login-submit"
              disabled={!email || !password}
              style={{
                opacity: (!email || !password) ? 0.6 : 1,
                cursor: (!email || !password) ? "not-allowed" : "pointer",
                marginTop: "10px"
              }}
            >
              Sign In
            </button>
          </form>


          <div className="auth-divider">
            <span>or</span>
          </div>

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
