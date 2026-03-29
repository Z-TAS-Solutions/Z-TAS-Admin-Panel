import { useState } from "react";
import { User, Mail, Phone, CreditCard, Save, ArrowLeft, Scan, Loader2, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router";

export function UserEnrollment() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    nic: ""
  });
  const [loading, setLoading] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setIsScanning(true);

    try {
      // Simulate waiting for the physical Z-TAS biometric scanner
      await new Promise(resolve => setTimeout(resolve, 3500));

      setSuccess(true);
      setFormData({ name: "", email: "", phone: "", nic: "" });
    } catch (err) {
      console.error("Failed to enroll user", err);
      setError("Failed to enroll user. Please try again.");
    } finally {
      setIsScanning(false);
    }
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
            Register a new user profile for Z-TAS biometric scanner access
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

        {isScanning ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-6 text-center animate-in fade-in zoom-in duration-500">
            <div className="relative">
              <div className="absolute inset-0 bg-[#00C2FF]/20 blur-xl rounded-full animate-pulse object-cover"></div>
              <div className="relative bg-[#0A0F1C] border border-[#00C2FF]/30 p-6 rounded-2xl">
                <Scan size={48} className="text-[#00C2FF] animate-pulse" />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white tracking-wide">Awaiting Biometric Scan</h3>
              <p className="text-sm text-gray-400 max-w-[250px] mx-auto">
                Please instruct the user to place their palm on the Z-TAS biometric scanner.
              </p>
            </div>

            <div className="flex items-center gap-2 text-[#00C2FF]/70 text-sm">
              <Loader2 size={16} className="animate-spin" />
              <span>Scanning for device input...</span>
            </div>
          </div>
        ) : success ? (
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
                The user has been successfully matched!
              </p>
            </div>

            <button
              onClick={() => setSuccess(false)}
              className="mt-4 px-6 py-2 rounded-lg border border-[#00C2FF]/20 text-[#00C2FF] hover:bg-[#00C2FF]/10 transition-colors text-sm font-medium"
            >
              Enroll Another User
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 animate-in fade-in duration-300">
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
                  placeholder="+94 70 123 4567"
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
              <p className="text-xs text-gray-500 mt-1">
                Required for biometric identity verification.
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isScanning}
                className="w-full gradient-button py-3 rounded-lg text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <Save size={18} />
                <span>Continue Enrollment</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
