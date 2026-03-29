import { Settings as SettingsIcon, Bell, Shield, Globe, Database, Mail } from "lucide-react";
import { useState } from "react";

export function Settings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);
  const [autoBackup, setAutoBackup] = useState(true);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold neon-text">System Settings</h1>
        <p className="text-sm text-gray-400 mt-1">
          Configure system-wide settings and preferences
        </p>
      </div>

      {/* General Settings */}
      <div className="glass-panel p-6 rounded-xl border border-[#00C2FF]/20">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <SettingsIcon size={20} className="text-[#00C2FF]" />
          General Settings
        </h2>
        
        <div className="space-y-4">
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
      </div>

      {/* Notification Settings */}
      <div className="glass-panel p-6 rounded-xl border border-[#00C2FF]/20">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Bell size={20} className="text-[#00C2FF]" />
          Notification Settings
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 glass-panel rounded-lg border border-[#00C2FF]/20">
            <div className="flex items-center gap-3">
              <Mail size={20} className="text-[#00C2FF]" />
              <div>
                <p className="font-semibold">Email Notifications</p>
                <p className="text-sm text-gray-400">Receive security alerts via email</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#00C2FF] peer-checked:to-[#1E90FF]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 glass-panel rounded-lg border border-[#00C2FF]/20">
            <div className="flex items-center gap-3">
              <Bell size={20} className="text-[#00C2FF]" />
              <div>
                <p className="font-semibold">Push Notifications</p>
                <p className="text-sm text-gray-400">Browser push notifications for critical alerts</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={pushNotifications}
                onChange={(e) => setPushNotifications(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#00C2FF] peer-checked:to-[#1E90FF]"></div>
            </label>
          </div>
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
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={twoFactorAuth}
                onChange={(e) => setTwoFactorAuth(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#00C2FF] peer-checked:to-[#1E90FF]"></div>
            </label>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Session Timeout</label>
              <select className="w-full bg-[#0A0F1C] border border-[#00C2FF]/20 rounded-lg px-4 py-2 outline-none focus:border-[#00C2FF]">
                <option>15 minutes</option>
                <option>30 minutes</option>
                <option>1 hour</option>
                <option>4 hours</option>
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
          <div className="flex gap-4">
            <button 
              className="gradient-button px-6 py-2 rounded-lg font-semibold flex items-center gap-2" 
              onClick={() => {
                const csvContent = "data:text/csv;charset=utf-8,ID,Name,Type\n1,System,Data";
                const encodedUri = encodeURI(csvContent);
                const link = document.createElement("a");
                link.setAttribute("href", encodedUri);
                link.setAttribute("download", "system_backup.csv");
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              Download Full CSV Data
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
