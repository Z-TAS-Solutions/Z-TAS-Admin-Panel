import { Shield, Key, Clock, Lock, Settings as SettingsIcon } from "lucide-react";
import { useState } from "react";

export function MFASettings() {
  const [otpEnabled, setOtpEnabled] = useState(true);
  const [passkeyEnabled, setPasskeyEnabled] = useState(true);
  const [otpExpiration, setOtpExpiration] = useState("300");
  const [maxRetries, setMaxRetries] = useState("3");
  const [lockoutDuration, setLockoutDuration] = useState("30");
  const [enforceMFA, setEnforceMFA] = useState(true);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold neon-text">MFA Settings</h1>
        <p className="text-sm text-gray-400 mt-1">
          Configure multi-factor authentication policies and settings
        </p>
      </div>

      {/* MFA Methods */}
      <div className="glass-panel p-6 rounded-xl border border-[#00C2FF]/20">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Shield size={20} className="text-[#00C2FF]" />
          Authentication Methods
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 glass-panel rounded-lg border border-[#00C2FF]/20">
            <div className="flex items-center gap-3">
              <Key size={20} className="text-[#00C2FF]" />
              <div>
                <p className="font-semibold">One-Time Password (OTP)</p>
                <p className="text-sm text-gray-400">SMS and email-based verification codes</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={otpEnabled}
                onChange={(e) => setOtpEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#00C2FF] peer-checked:to-[#1E90FF]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 glass-panel rounded-lg border border-[#00C2FF]/20">
            <div className="flex items-center gap-3">
              <Shield size={20} className="text-[#00C2FF]" />
              <div>
                <p className="font-semibold">Passkeys (WebAuthn)</p>
                <p className="text-sm text-gray-400">Biometric and hardware-based authentication</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={passkeyEnabled}
                onChange={(e) => setPasskeyEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#00C2FF] peer-checked:to-[#1E90FF]"></div>
            </label>
          </div>
        </div>
      </div>

      {/* OTP Configuration */}
      <div className="glass-panel p-6 rounded-xl border border-[#00C2FF]/20">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Clock size={20} className="text-[#00C2FF]" />
          OTP Configuration
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2">OTP Expiration Time</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={otpExpiration}
                onChange={(e) => setOtpExpiration(e.target.value)}
                className="flex-1 bg-[#0A0F1C] border border-[#00C2FF]/20 rounded-lg px-4 py-2 outline-none focus:border-[#00C2FF]"
              />
              <span className="text-sm text-gray-400">seconds</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Max Retry Attempts</label>
            <input
              type="number"
              value={maxRetries}
              onChange={(e) => setMaxRetries(e.target.value)}
              className="w-full bg-[#0A0F1C] border border-[#00C2FF]/20 rounded-lg px-4 py-2 outline-none focus:border-[#00C2FF]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Lockout Duration</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={lockoutDuration}
                onChange={(e) => setLockoutDuration(e.target.value)}
                className="flex-1 bg-[#0A0F1C] border border-[#00C2FF]/20 rounded-lg px-4 py-2 outline-none focus:border-[#00C2FF]"
              />
              <span className="text-sm text-gray-400">minutes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Security Policies */}
      <div className="glass-panel p-6 rounded-xl border border-[#00C2FF]/20">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Lock size={20} className="text-[#00C2FF]" />
          Security Policies
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 glass-panel rounded-lg border border-[#00C2FF]/20">
            <div>
              <p className="font-semibold">Enforce Multi-Factor Authentication</p>
              <p className="text-sm text-gray-400">Require all users to enable at least one MFA method</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={enforceMFA}
                onChange={(e) => setEnforceMFA(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#00C2FF] peer-checked:to-[#1E90FF]"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="gradient-button px-8 py-3 rounded-lg font-semibold">
          Save Changes
        </button>
      </div>
    </div>
  );
}
