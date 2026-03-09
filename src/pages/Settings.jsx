import { useState } from "react";
import { Settings as SettingsIcon } from "lucide-react";

export function Settings() {
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

    </div>
  );
}