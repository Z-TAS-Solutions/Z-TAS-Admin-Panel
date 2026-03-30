import { useState } from "react";
import { User, Mail, Phone, CreditCard, Save, ArrowLeft, KeyRound, Loader2, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router";
import { usersService } from "../../services/users";

export function UserEnrollment() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    nic: ""
  });
  const [otp, setOtp] = useState("");
  const [userId, setUserId] = useState(null);
  
  const [step, setStep] = useState(1); // 1 = form, 2 = otp, 3 = success

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const res = await usersService.registerNew(formData);
      setUserId(res.userId);
      setMessage(res.message);
      setStep(2);
    } catch (err) {
      console.error("Failed to enroll user", err);
      setError(err?.response?.data?.message || "Failed to register user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      await usersService.verifyOTP({ userId, otp });
      setStep(3);
    } catch (err) {
      console.error("Failed to verify OTP", err);
      setError(err?.response?.data?.message || "Failed to verify OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setError("");
    setMessage("");
    setLoading(true);
    try {
      const res = await usersService.resendOTP({ userId });
      setMessage(res.message || "OTP resent successfully.");
    } catch (err) {
      console.error("Failed to resend OTP", err);
      setError(err?.response?.data?.message || "Failed to resend OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setUserId(null);
    setOtp("");
    setFormData({ name: "", email: "", phone: "", nic: "" });
    setError("");
    setMessage("");
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-[#00C2FF]/10 rounded-lg transition-colors text-gray-400 hover:text-[#00C2FF]"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold neon-text">User Enrollment</h1>
          <p className="text-sm text-gray-400 mt-1">
            Register a new user profile and verify via OTP
          </p>
        </div>
      </div>

      {/* Form Card or State Logic */}
      <div className="glass-panel p-6 rounded-xl border border-[#00C2FF]/20">

        {error && (
          <div className="mb-6 p-4 bg-[#FF3B5C]/10 border border-[#FF3B5C]/20 rounded-lg text-[#FF3B5C] text-sm flex items-center gap-2">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-6 p-4 bg-[#00FF88]/10 border border-[#00FF88]/20 rounded-lg text-[#00FF88] text-sm flex items-center gap-2">
            <CheckCircle2 size={18} />
            {message}
          </div>
        )}

        {step === 2 ? (
          <form onSubmit={handleVerifyOTP} className="space-y-5 animate-in fade-in duration-300">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-white mb-2">Verify OTP</h3>
              <p className="text-sm text-gray-400">
                Please enter the OTP sent to {formData.email} or {formData.phone}
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">OTP</label>
              <div className="flex items-center gap-3 glass-panel px-4 py-3 rounded-lg border border-[#00C2FF]/20 focus-within:border-[#00C2FF]">
                <KeyRound size={18} className="text-[#00C2FF]" />
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  required
                  className="bg-transparent border-none outline-none flex-1 text-white placeholder-gray-500 tracking-widest"
                />
              </div>
            </div>

            <div className="pt-4 flex flex-col gap-3">
              <button
                type="submit"
                disabled={loading || !otp}
                className="w-full gradient-button py-3 rounded-lg text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                <span>Verify OTP</span>
              </button>
              
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={loading}
                className="w-full py-3 rounded-lg border border-[#00C2FF]/30 text-[#00C2FF] font-semibold flex items-center justify-center gap-2 hover:bg-[#00C2FF]/10 transition-all disabled:opacity-50"
              >
                Resend OTP
              </button>
            </div>
          </form>
        ) : step === 3 ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-6 text-center animate-in fade-in zoom-in duration-500">
            <div className="relative">
              <div className="absolute inset-0 bg-[#00FF88]/20 blur-xl rounded-full"></div>
              <div className="relative bg-[#0A0F1C] border border-[#00FF88]/30 p-6 rounded-2xl">
                <CheckCircle2 size={48} className="text-[#00FF88]" />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white tracking-wide">Enrollment Complete</h3>
              <p className="text-sm text-gray-400">
                The user account has been successfully verified!
              </p>
            </div>

            <button
              onClick={resetForm}
              className="mt-4 px-6 py-2 rounded-lg border border-[#00C2FF]/20 text-[#00C2FF] hover:bg-[#00C2FF]/10 transition-colors text-sm font-medium"
            >
              Enroll Another User
            </button>
          </div>
        ) : (
          <form onSubmit={handleRegister} className="space-y-5 animate-in fade-in duration-300">
            {/* Name Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Full Name</label>
              <div className="flex items-center gap-3 glass-panel px-4 py-3 rounded-lg border border-[#00C2FF]/20 focus-within:border-[#00C2FF]">
                <User size={18} className="text-[#00C2FF]" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  required
                  className="bg-transparent border-none outline-none flex-1 text-white placeholder-gray-500"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Email Address</label>
              <div className="flex items-center gap-3 glass-panel px-4 py-3 rounded-lg border border-[#00C2FF]/20 focus-within:border-[#00C2FF]">
                <Mail size={18} className="text-[#00C2FF]" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  required
                  className="bg-transparent border-none outline-none flex-1 text-white placeholder-gray-500"
                />
              </div>
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Phone Number</label>
              <div className="flex items-center gap-3 glass-panel px-4 py-3 rounded-lg border border-[#00C2FF]/20 focus-within:border-[#00C2FF]">
                <Phone size={18} className="text-[#00C2FF]" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="0701234567"
                  required
                  className="bg-transparent border-none outline-none flex-1 text-white placeholder-gray-500"
                />
              </div>
            </div>

            {/* NIC Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">NIC (National Identity Card)</label>
              <div className="flex items-center gap-3 glass-panel px-4 py-3 rounded-lg border border-[#00C2FF]/20 focus-within:border-[#00C2FF]">
                <CreditCard size={18} className="text-[#00C2FF]" />
                <input
                  type="text"
                  name="nic"
                  value={formData.nic}
                  onChange={handleChange}
                  required
                  className="bg-transparent border-none outline-none flex-1 text-white placeholder-gray-500 uppercase"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full gradient-button py-3 rounded-lg text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                <span>Register User</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
