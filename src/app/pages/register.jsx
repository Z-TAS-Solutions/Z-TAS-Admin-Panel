import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff, Fingerprint, ShieldAlert, AlertCircle } from "lucide-react";

export function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    nic: "",
    email: "",
    password: "",
    phone: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [syncedPasskeys, setSyncedPasskeys] = useState(false);
  const [error, setError] = useState("");

  const update = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    // validation
    if (Object.values(form).some(value => !value.trim())) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      // this the WebAuthn API -registering a new passkey
      const publicKeyOptions = {
        challenge: crypto.getRandomValues(new Uint8Array(32)),
        rp: { name: "ZTAS Admin", id: window.location.hostname },
        user: {
          id: crypto.getRandomValues(new Uint8Array(16)),
          name: form.email,
          displayName: form.fullName,
        },
        pubKeyCredParams: [
          { alg: -7, type: "public-key" },   // ES256
          { alg: -257, type: "public-key" },  // RS256
        ],
        timeout: 60000,
        authenticatorSelection: {
          // device bound by default, synced only if opted 
          residentKey: "required",
          requireResidentKey: true,
          userVerification: "required",
          ...(syncedPasskeys
            ? {}
            : { authenticatorAttachment: "platform" }), // device-bound only
        },
        attestation: "none",
      };

      console.log("Registering with:", form);

      // Once backend done, call api to nav to dashboard
    } catch (err) {
      console.error("Passkey registration failed:", err);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card-inner">
          {/* Branding */}
          <div className="auth-brand">
            <img
              src="/z_taslogo.png"
              alt="ZTAS Logo"
              className="auth-brand-logo"
            />
            <h1>ZTAS Admin Console</h1>
            <p>Create your admin account</p>
          </div>

          <form onSubmit={handleRegister} noValidate>
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
            {/* Full Name */}
            <div className="auth-field">
              <label htmlFor="reg-fullname">Full Name</label>
              <div className="auth-input-wrapper">
                <input
                  id="reg-fullname"
                  type="text"
                  className="auth-input"
                  placeholder="Enter your full name"
                  value={form.fullName}
                  onChange={update("fullName")}
                  required
                  autoComplete="name"
                  aria-label="Full Name"
                />
              </div>
            </div>

            {/* NIC */}
            <div className="auth-field">
              <label htmlFor="reg-nic">NIC Number</label>
              <div className="auth-input-wrapper">
                <input
                  id="reg-nic"
                  type="text"
                  className="auth-input"
                  placeholder="National Identity Card number"
                  value={form.nic}
                  onChange={update("nic")}
                  required
                  aria-label="NIC Number"
                  aria-describedby="nic-hint"
                />
              </div>
              <span
                id="nic-hint"
                style={{ fontSize: 12, color: "#5a6a7a", marginTop: 4, display: "block" }}
              >
                Enter your National Identity Card number
              </span>
            </div>

            {/* Email */}
            <div className="auth-field">
              <label htmlFor="reg-email">Email Address</label>
              <div className="auth-input-wrapper">
                <input
                  id="reg-email"
                  type="email"
                  className="auth-input"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={update("email")}
                  required
                  autoComplete="email"
                  aria-label="Email Address"
                />
              </div>
            </div>

            {/* Password */}
            <div className="auth-field">
              <label htmlFor="reg-password">Password</label>
              <div className="auth-input-wrapper">
                <input
                  id="reg-password"
                  type={showPassword ? "text" : "password"}
                  className="auth-input"
                  placeholder="Create a strong password"
                  value={form.password}
                  onChange={update("password")}
                  required
                  autoComplete="new-password"
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

            {/* Phone */}
            <div className="auth-field">
              <label htmlFor="reg-phone">Phone Number</label>
              <div className="auth-input-wrapper">
                <input
                  id="reg-phone"
                  type="tel"
                  className="auth-input"
                  value={form.phone}
                  onChange={update("phone")}
                  required
                  autoComplete="tel"
                  aria-label="Phone Number"
                />
              </div>
            </div>

            {/* Passkey Section */}
            <div className="auth-passkey-section">
              <h3>
                <Fingerprint size={18} />
                Passkey Setup
              </h3>
              <p className="auth-passkey-desc">
                A device-bound passkey will be created by default for secure,
                passwordless future logins.
              </p>

              {/* toggle for enabling synced passkeys*/}
              <label className="auth-synced-toggle" htmlFor="synced-passkey-toggle">
                <input
                  id="synced-passkey-toggle"
                  type="checkbox"
                  checked={syncedPasskeys}
                  onChange={(e) => setSyncedPasskeys(e.target.checked)}
                  aria-describedby="synced-passkey-warning"
                />
                <span>Enable synced passkeys</span>
              </label>

              {/* red warning  */}
              {syncedPasskeys && (
                <div
                  className="auth-synced-warning"
                  id="synced-passkey-warning"
                  role="alert"
                >
                  <ShieldAlert
                    size={16}
                    style={{ display: "inline", verticalAlign: "middle", marginRight: 6 }}
                  />
                  <strong>Warning:</strong> Synced passkeys are stored in the cloud
                  and may be accessible across devices. Only enable this if you
                  understand the security implications.
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="auth-submit"
              id="register-submit"
              style={{
                marginTop: 28,
                opacity: Object.values(form).some(v => !v.trim()) ? 0.6 : 1,
                cursor: Object.values(form).some(v => !v.trim()) ? "not-allowed" : "pointer"
              }}
              disabled={Object.values(form).some(v => !v.trim())}
            >
              Create Account
            </button>
          </form>

          {/* Footer */}
          <div className="auth-footer">
            Already have an account?{" "}
            <Link to="/login">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
