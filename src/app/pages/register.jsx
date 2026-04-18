import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Fingerprint, AlertCircle } from "lucide-react";
import { usersService } from "../../services/users";
import { webauthnService } from "../../services/webauthn";
import {
  parseCreationOptionsFromJSON,
} from "../../lib/webAuthnHelpers";

const ROLE_ADMIN = "Admin";

function defaultDeviceName() {
  const ua = navigator.userAgent || "";
  if (/Windows/i.test(ua)) return "Windows device";
  if (/Mac OS X|Macintosh/i.test(ua)) return "Mac device";
  if (/iPhone|iPad|iPod/i.test(ua)) return "Apple mobile device";
  if (/Android/i.test(ua)) return "Android device";
  return "Web device";
}

export function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    fullName: "",
    nic: "",
    email: "",
    phone: "",
  });
  const [userId, setUserId] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const update = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const apiMessage = (err) =>
    err?.response?.data?.message ||
    err?.data?.message ||
    err?.message ||
    "Something went wrong.";

  function extractCustomId(res) {
    if (!res || typeof res !== "object") return null;
    const candidates = [
      res.data?.custom_id,
      res.data?.user_id,
      res.data?.data?.custom_id,
      res.custom_id,
      res.user_id,
    ];
    for (const c of candidates) {
      if (c != null && String(c).trim() !== "") return String(c).trim();
    }
    return null;
  }

  /** Step 1: POST /admin/users/register/new */
  const handleStep1 = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (Object.values(form).some((v) => !String(v).trim())) {
      setError("Please fill in all fields.");
      return;
    }
    const phone = form.phone.trim();
    setLoading(true);
    try {
      const res = await usersService.registerNew({
        name: form.fullName.trim(),
        email: form.email.trim(),
        phone_no: phone,
        nic: form.nic.trim(),
        role: ROLE_ADMIN,
      });
      const customId = extractCustomId(res);
      if (!customId) {
        throw new Error("Registration succeeded but no user id was returned.");
      }
      setUserId(customId);
      setStep(2);
      const serverMsg =
        (typeof res?.message === "string" && res.message) ||
        (typeof res?.data?.message === "string" && res.data.message);
      setMessage(
        serverMsg ||
          "Check your email for a 6-character OTP (check spam/junk if needed).",
      );
    } catch (err) {
      console.error(err);
      setError(apiMessage(err));
    } finally {
      setLoading(false);
    }
  };

  /** Step 2: POST /admin/users/register/verifyOTP */
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (!otp.trim()) {
      setError("Please enter the OTP from your email.");
      return;
    }
    setLoading(true);
    try {
      await usersService.verifyOTP({
        user_id: userId,
        otp: otp.trim(),
      });
      setMessage("OTP verified. Register your passkey next.");
      setStep(3);
      await runPasskeyRegistration();
    } catch (err) {
      console.error(err);
      setError(apiMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setError("");
    setMessage("");
    if (!userId) return;
    setLoading(true);
    try {
      await usersService.resendOTP({ user_id: userId });
      setMessage("A new OTP has been sent to your email.");
    } catch (err) {
      console.error(err);
      setError(apiMessage(err));
    } finally {
      setLoading(false);
    }
  };

  /** Steps 3–4: webauthn register begin → create → finish */
  const runPasskeyRegistration = async () => {
    if (!window.isSecureContext || !window.PublicKeyCredential || !navigator.credentials?.create) {
      setError("Passkeys require HTTPS or localhost with WebAuthn support.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const beginRes = await webauthnService.registerBegin(form.email.trim());
      const inner = beginRes?.data ?? beginRes;
      const sessionToken = inner?.session_token ?? beginRes?.data?.session_token;
      const creationData = inner?.creation_data ?? beginRes?.data?.creation_data;
      if (!sessionToken || !creationData) {
        throw new Error("Passkey setup could not start (missing session or options).");
      }

      const publicKey = parseCreationOptionsFromJSON(creationData);
      const credential = await navigator.credentials.create({ publicKey });
      if (!credential) {
        throw new Error("Passkey creation was cancelled.");
      }

      const finishRes = await webauthnService.registerFinish(
        sessionToken,
        credential,
        defaultDeviceName(),
      );
      const token =
        finishRes?.data?.token ??
        finishRes?.token;
      if (!token) {
        throw new Error("Passkey registered but no token was returned.");
      }
      localStorage.setItem("token", token);
      localStorage.removeItem("access_token");
      setMessage("You're signed in. Redirecting to dashboard…");
      setTimeout(() => navigate("/dashboard"), 800);
    } catch (err) {
      console.error(err);
      setError(apiMessage(err));
      setStep(2);
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
            <p>Create your admin account</p>
          </div>

          {message && (
            <div
              className="auth-success-alert"
              style={{
                backgroundColor: "rgba(0, 255, 136, 0.1)",
                border: "1px solid rgba(0, 255, 136, 0.2)",
                color: "#00FF88",
                padding: "10px",
                borderRadius: "8px",
                marginBottom: "20px",
                fontSize: "14px",
              }}
            >
              <span>{message}</span>
            </div>
          )}
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

          {step === 1 && (
            <form onSubmit={handleStep1} noValidate>
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
                  />
                </div>
              </div>
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
                  />
                </div>
              </div>
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
                  />
                </div>
              </div>
              <div className="auth-field">
                <label htmlFor="reg-phone">Phone Number</label>
                <div className="auth-input-wrapper">
                  <input
                    id="reg-phone"
                    type="tel"
                    className="auth-input"
                    placeholder="+94771234567"
                    value={form.phone}
                    onChange={update("phone")}
                    required
                    autoComplete="tel"
                  />
                </div>
                <span style={{ fontSize: 12, color: "#5a6a7a", marginTop: 4, display: "block" }}>
                  Use international format with + if the server requires it (e.g. +94771234567).
                </span>
              </div>
              <button
                type="submit"
                className="auth-submit"
                id="register-submit"
                style={{ marginTop: 28 }}
                disabled={loading || Object.values(form).some((v) => !String(v).trim())}
              >
                {loading ? "Please wait…" : "Create account"}
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleVerifyOtp} noValidate>
              <p className="text-sm text-gray-400 mb-4">
                Enter the 6-character code sent to <strong>{form.email}</strong>.
                If nothing arrives after a minute, use <strong>Resend OTP</strong> or confirm your
                email and phone format with the team (delivery is handled by the server, not the
                browser).
              </p>
              <div className="auth-field">
                <label htmlFor="reg-otp">OTP</label>
                <div className="auth-input-wrapper">
                  <input
                    id="reg-otp"
                    type="text"
                    className="auth-input"
                    placeholder="e.g. aB3kZ9"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={12}
                    required
                    autoComplete="one-time-code"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="auth-submit"
                disabled={loading || !otp.trim()}
              >
                {loading ? "Please wait…" : "Verify OTP & register passkey"}
              </button>
              <button
                type="button"
                className="auth-submit"
                style={{ marginTop: 12, opacity: 0.85 }}
                onClick={handleResendOtp}
                disabled={loading}
              >
                Resend OTP
              </button>
            </form>
          )}

          {step === 3 && (
            <div className="auth-passkey-section text-center py-6">
              <Fingerprint size={40} className="mx-auto text-[#00C2FF] mb-3" />
              <p className="text-gray-300">
                {loading
                  ? "Follow the prompt to create your passkey…"
                  : "If nothing happened, go back and try verifying OTP again."}
              </p>
            </div>
          )}

          <div className="auth-footer">
            Already have an account? <Link to="/login">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
