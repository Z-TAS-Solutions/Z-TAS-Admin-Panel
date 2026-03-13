import { Smartphone, MapPin, LogOut, Monitor, Tablet } from "lucide-react";

const devicesData = [
    {
        id: "DEV-9384",
        deviceName: "iPhone 13 Pro",
        deviceType: "Mobile",
        ipAddress: "192.168.1.45",
        location: "New York, US",
        lastActive: "2024-03-04 14:23:11",
        icon: Smartphone,
    },
    {
        id: "DEV-8271",
        deviceName: "MacBook Pro",
        deviceType: "Desktop",
        ipAddress: "10.0.0.112",
        location: "San Francisco, US",
        lastActive: "2024-03-04 10:45:33",
        icon: Monitor,
    },
    {
        id: "DEV-7156",
        deviceName: "Windows Desktop",
        deviceType: "Desktop",
        ipAddress: "172.16.0.89",
        location: "Los Angeles, US",
        lastActive: "2024-03-03 16:22:18",
        icon: Monitor,
    },
    {
        id: "DEV-6042",
        deviceName: "Samsung Galaxy Tab",
        deviceType: "Tablet",
        ipAddress: "192.168.1.67",
        location: "Chicago, US",
        lastActive: "2024-03-02 09:15:47",
        icon: Tablet,
    },
    {
        id: "DEV-4928",
        deviceName: "iPad Pro",
        deviceType: "Tablet",
        ipAddress: "10.0.0.234",
        location: "Boston, US",
        lastActive: "2024-03-01 14:30:22",
        icon: Tablet,
    },
];

export function Devices() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold neon-text">Device Management</h1>
                <p className="text-sm text-gray-400 mt-1">
                    Monitor and manage all linked devices across your system
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="glass-panel p-4 rounded-xl border border-[#00C2FF]/20">
                    <p className="text-sm text-gray-400">Total Devices</p>
                    <p className="text-2xl font-bold neon-text mt-1">8,472</p>
                </div>
                <div className="glass-panel p-4 rounded-xl border border-[#00C2FF]/20">
                    <p className="text-sm text-gray-400">Mobile Devices</p>
                    <p className="text-2xl font-bold text-[#00C2FF] mt-1">5,234</p>
                </div>
                <div className="glass-panel p-4 rounded-xl border border-[#00C2FF]/20">
                    <p className="text-sm text-gray-400">Desktop</p>
                    <p className="text-2xl font-bold text-[#1E90FF] mt-1">2,891</p>
                </div>
                <div className="glass-panel p-4 rounded-xl border border-[#00C2FF]/20">
                    <p className="text-sm text-gray-400">Tablets</p>
                    <p className="text-2xl font-bold text-[#00FF88] mt-1">347</p>
                </div>
            </div>

            {/* Devices Table */}
            <div className="glass-panel rounded-xl border border-[#00C2FF]/20 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-[#00C2FF]/20 bg-[#00C2FF]/5">
                                <th className="text-left py-4 px-4 text-sm font-semibold text-[#00C2FF]">
                                    Device ID
                                </th>
                                <th className="text-left py-4 px-4 text-sm font-semibold text-[#00C2FF]">
                                    Device Name
                                </th>
                                <th className="text-left py-4 px-4 text-sm font-semibold text-[#00C2FF]">
                                    Type
                                </th>
                                <th className="text-left py-4 px-4 text-sm font-semibold text-[#00C2FF]">
                                    IP Address
                                </th>
                                <th className="text-left py-4 px-4 text-sm font-semibold text-[#00C2FF]">
                                    Location
                                </th>
                                <th className="text-left py-4 px-4 text-sm font-semibold text-[#00C2FF]">
                                    Last Active
                                </th>
                                <th className="text-left py-4 px-4 text-sm font-semibold text-[#00C2FF]">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {devicesData.map((device) => {
                                const Icon = device.icon;
                                return (
                                    <tr key={device.id} className="table-row">
                                        <td className="py-4 px-4 text-sm font-mono">{device.id}</td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00C2FF]/20 to-[#1E90FF]/20 flex items-center justify-center">
                                                    <Icon size={18} className="text-[#00C2FF]" />
                                                </div>
                                                <span className="text-sm font-medium">{device.deviceName}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 text-sm">
                                            <span className="px-2 py-1 rounded bg-[#00C2FF]/10 text-[#00C2FF] text-xs">
                                                {device.deviceType}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-sm font-mono text-gray-400">
                                            {device.ipAddress}
                                        </td>
                                        <td className="py-4 px-4 text-sm text-gray-400">
                                            <div className="flex items-center gap-2">
                                                <MapPin size={14} className="text-[#00C2FF]" />
                                                {device.location}
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 text-sm font-mono text-gray-400">
                                            {device.lastActive}
                                        </td>
                                        <td className="py-4 px-4">
                                            <button className="flex items-center gap-2 px-3 py-2 hover:bg-[#FF3B5C]/10 rounded-lg transition-colors group text-sm">
                                                <LogOut size={14} className="text-gray-400 group-hover:text-[#FF3B5C]" />
                                                <span className="text-gray-400 group-hover:text-[#FF3B5C]">
                                                    Force Logout
                                                </span>
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
