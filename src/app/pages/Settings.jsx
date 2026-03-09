import { useState } from "react";
import { Settings as SettingsIcon, Bell, Shield, Database, Mail } from "lucide-react";

export function Settings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);
  const [autoBackup, setAutoBackup] = useState(true);

  return (
    <div className="space-y-6">

      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold neon-text">System Settings</h1>
        <p className="text-sm text-gray-400 mt-1">Configure system-wide settings and preferences</p>
      </div>

      {/* General Settings */}
      <div className="glass-panel p-6 rounded-xl border border-[#00C2FF]/20">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <SettingsIcon size={20} className="text-[#00C2FF]" />
          General Settings
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2">System Name</label>
            <input
              type="text"
              defaultValue="ZTAS Admin Console"
              className="w-full bg-[#0A0F1C] border border-[#00C2FF]/20 rounded-lg px-4 py-2 outline-none focus:border-[#00C2FF]"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Time Zone</label>
            <select className="w-full bg-[#0A0F1C] border border-[#00C2FF]/20 rounded-lg px-4 py-2 outline-none focus:border-[#00C2FF]">
              <option>UTC-5 (Eastern Time)</option>
              <option>UTC-8 (Pacific Time)</option>
              <option>UTC+0 (GMT)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="glass-panel p-6 rounded-xl border border-[#00C2FF]/20">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Bell size={20} className="text-[#00C2FF]" />
          Notification Settings
        </h2>
        <div className="space-y-4">

          {/* toggle row reused twice */}
          {[
            { icon: Mail,  label: "Email Notifications", desc: "Receive security alerts via email",           value: emailNotifications, set: setEmailNotifications },
            { icon: Bell,  label: "Push Notifications",  desc: "Browser push notifications for critical alerts", value: pushNotifications,  set: setPushNotifications  },
          ].map(({ icon: Icon, label, desc, value, set }) => (
            <div key={label} className="flex items-center justify-between p-4 glass-panel rounded-lg border border-[#00C2FF]/20">
              <div className="flex items-center gap-3">
                <Icon size={20} className="text-[#00C2FF]" />
                <div>
                  <p className="font-semibold">{label}</p>
                  <p className="text-sm text-gray-400">{desc}</p>
                </div>
              </div>
              <Toggle value={value} onChange={set} />
            </div>
          ))}

        </div>
      </div>

      {/* Security Settings */}
      <div className="glass-panel p-6 rounded-xl border border-[#00C2FF]/20">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Shield size={20} className="text-[#00C2FF]" />
          Security Settings
        </h2>
        <div className="space-y-4">

          <div className="flex items-center justify-between p-4 glass-panel rounded-lg border border-[#00C2FF]/20">
            <div className="flex items-center gap-3">
              <Shield size={20} className="text-[#00C2FF]" />
              <div>
                <p className="font-semibold">Two-Factor Authentication</p>
                <p className="text-sm text-gray-400">Require 2FA for admin console access</p>
              </div>
            </div>
            <Toggle value={twoFactorAuth} onChange={setTwoFactorAuth} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Session Timeout</label>
              <select className="w-full bg-[#0A0F1C] border border-[#00C2FF]/20 rounded-lg px-4 py-2 outline-none focus:border-[#00C2FF]">
                <option>15 minutes</option>
                <option>30 minutes</option>
                <option>1 hour</option>
                <option>4 hours</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Password Policy</label>
              <select className="w-full bg-[#0A0F1C] border border-[#00C2FF]/20 rounded-lg px-4 py-2 outline-none focus:border-[#00C2FF]">
                <option>Standard (8+ chars)</option>
                <option>Strong (12+ chars, mixed)</option>
                <option>Very Strong (16+ chars, special)</option>
              </select>
            </div>
          </div>

        </div>
      </div>

      {/* Backup Settings */}
      <div className="glass-panel p-6 rounded-xl border border-[#00C2FF]/20">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Database size={20} className="text-[#00C2FF]" />
          Backup & Recovery
        </h2>
        <div className="space-y-4">

          <div className="flex items-center justify-between p-4 glass-panel rounded-lg border border-[#00C2FF]/20">
            <div className="flex items-center gap-3">
              <Database size={20} className="text-[#00C2FF]" />
              <div>
                <p className="font-semibold">Automatic Backup</p>
                <p className="text-sm text-gray-400">Daily automated database backups</p>
              </div>
            </div>
            <Toggle value={autoBackup} onChange={setAutoBackup} />
          </div>

          <div className="flex gap-4">
            <button className="px-6 py-2 rounded-lg border border-[#00C2FF]/20 hover:bg-[#00C2FF]/10 transition-colors">
              Create Backup Now
            </button>
            <button className="px-6 py-2 rounded-lg border border-[#00C2FF]/20 hover:bg-[#00C2FF]/10 transition-colors">
              Restore from Backup
            </button>
          </div>

        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="gradient-button px-8 py-3 rounded-lg font-semibold">
          Save All Changes
        </button>
      </div>

    </div>
  );
}

// --- Reusable toggle switch component ---
function Toggle({ value, onChange }) {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} className="sr-only peer" />
      <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#00C2FF] peer-checked:to-[#1E90FF]"></div>
    </label>
  );
}