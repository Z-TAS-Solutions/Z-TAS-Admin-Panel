import { Key, Trash2, Chrome, Apple, Monitor } from "lucide-react";

const passkeyData = [
  {
    id: "PK-9384",
    deviceName: "Sarah's iPhone 13 Pro",
    browser: "Safari",
    platform: "iOS 17.2",
    created: "2024-01-15",
    lastUsed: "2024-03-04 14:23:11",
    icon: Apple,
  },
  {
    id: "PK-8271",
    deviceName: "Work MacBook Pro",
    browser: "Chrome",
    platform: "macOS 14.2",
    created: "2024-01-10",
    lastUsed: "2024-03-04 10:45:33",
    icon: Apple,
  },
  {
    id: "PK-7156",
    deviceName: "Personal Windows PC",
    browser: "Edge",
    platform: "Windows 11",
    created: "2024-02-03",
    lastUsed: "2024-03-03 16:22:18",
    icon: Monitor,
  },
  {
    id: "PK-6042",
    deviceName: "Android Phone",
    browser: "Chrome",
    platform: "Android 13",
    created: "2024-01-28",
    lastUsed: "2024-03-02 09:15:47",
    icon: Chrome,
  },
  {
    id: "PK-4928",
    deviceName: "YubiKey 5 NFC",
    browser: "Hardware Key",
    platform: "USB Security Key",
    created: "2024-01-05",
    lastUsed: "2024-03-01 14:30:22",
    icon: Key,
  },
];

export function Passkeys() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold neon-text">Passkey Management</h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage WebAuthn passkeys and biometric authentication devices
          </p>
        </div>
        <button className="gradient-button px-6 py-2 rounded-lg font-semibold">
          Register New Passkey
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-panel p-4 rounded-xl border border-[#00C2FF]/20">
          <p className="text-sm text-gray-400">Total Passkeys</p>
          <p className="text-2xl font-bold neon-text mt-1">4,512</p>
        </div>
        <div className="glass-panel p-4 rounded-xl border border-[#00C2FF]/20">
          <p className="text-sm text-gray-400">Active Today</p>
          <p className="text-2xl font-bold text-[#00FF88] mt-1">2,834</p>
        </div>
        <div className="glass-panel p-4 rounded-xl border border-[#00C2FF]/20">
          <p className="text-sm text-gray-400">Hardware Keys</p>
          <p className="text-2xl font-bold text-[#1E90FF] mt-1">892</p>
        </div>
        <div className="glass-panel p-4 rounded-xl border border-[#00C2FF]/20">
          <p className="text-sm text-gray-400">Biometric</p>
          <p className="text-2xl font-bold text-[#00C2FF] mt-1">3,620</p>
        </div>
      </div>

      {/* Passkeys Table */}
      <div className="glass-panel rounded-xl border border-[#00C2FF]/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#00C2FF]/20 bg-[#00C2FF]/5">
                <th className="text-left py-4 px-4 text-sm font-semibold text-[#00C2FF]">
                  Passkey ID
                </th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-[#00C2FF]">
                  Device Name
                </th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-[#00C2FF]">
                  Browser/Platform
                </th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-[#00C2FF]">
                  Platform
                </th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-[#00C2FF]">
                  Created Date
                </th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-[#00C2FF]">
                  Last Used
                </th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-[#00C2FF]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {passkeyData.map((passkey) => {
                const Icon = passkey.icon;
                return (
                  <tr key={passkey.id} className="table-row">
                    <td className="py-4 px-4 text-sm font-mono">{passkey.id}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00C2FF]/20 to-[#1E90FF]/20 flex items-center justify-center">
                          <Icon size={18} className="text-[#00C2FF]" />
                        </div>
                        <span className="text-sm font-medium">{passkey.deviceName}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-400">{passkey.browser}</td>
                    <td className="py-4 px-4 text-sm text-gray-400">{passkey.platform}</td>
                    <td className="py-4 px-4 text-sm font-mono text-gray-400">
                      {passkey.created}
                    </td>
                    <td className="py-4 px-4 text-sm font-mono text-gray-400">
                      {passkey.lastUsed}
                    </td>
                    <td className="py-4 px-4">
                      <button className="p-2 hover:bg-[#FF3B5C]/10 rounded-lg transition-colors group">
                        <Trash2 size={16} className="text-gray-400 group-hover:text-[#FF3B5C]" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
