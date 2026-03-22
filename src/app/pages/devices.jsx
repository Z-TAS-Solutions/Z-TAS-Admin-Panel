import { useState } from "react";
import { Smartphone, MapPin, LogOut, Monitor, Tablet, Search } from "lucide-react";

const devicesData = Array.from({ length: 45 }).map((_, i) => ({
    deviceId: `DEV-${9000 + i}`,
    deviceName: i % 3 === 0 ? "iPhone 13 Pro" : i % 3 === 1 ? "Samsung Galaxy S24" : "Google Pixel 8",
    ipAddress: `192.168.1.${10 + i}`,
    location: i % 3 === 0 ? "Colombo, LK" : i % 3 === 1 ? "Kandy, LK" : "Galle, LK",
    lastActive: "2024-03-04 14:23:11",
    icon: Smartphone,
}));

export function Devices() {
    const [searchTerm, setSearchTerm] = useState("");
    const [limit, setLimit] = useState(15);

    const filteredDevices = devicesData.filter(d => 
        d.deviceId.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const displayedDevices = filteredDevices.slice(0, limit);

    const handleScroll = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight + 50;
        if (bottom && limit < filteredDevices.length) {
            setLimit(prev => prev + 10);
        }
    };
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold neon-text">Device Management</h1>
                <p className="text-sm text-gray-400 mt-1">
                    Monitor and manage all linked devices across your system
                </p>
            </div>

            {/* Search */}
            <div className="glass-panel p-4 rounded-xl border border-[#00C2FF]/20">
                <div className="flex-1 flex items-center gap-2 glass-panel px-4 py-2 rounded-lg border border-[#00C2FF]/20 max-w-md">
                    <Search size={18} className="text-[#00C2FF]" />
                    <input
                        type="text"
                        placeholder="Search by Device ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-transparent border-none outline-none flex-1 text-sm outline-none"
                    />
                </div>
            </div>

            {/* Devices Table */}
            <div className="glass-panel rounded-xl border border-[#00C2FF]/20 overflow-hidden">
                <div 
                    className="overflow-x-auto max-h-[500px]" 
                    onScroll={handleScroll}
                >
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
                            {displayedDevices.map((device, idx) => {
                                const Icon = device.icon;
                                return (
                                    <tr key={`${device.deviceId}-${idx}`} className="table-row">
                                        <td className="py-4 px-4 text-sm font-mono">{device.deviceId}</td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00C2FF]/20 to-[#1E90FF]/20 flex items-center justify-center">
                                                    <Icon size={18} className="text-[#00C2FF]" />
                                                </div>
                                                <span className="text-sm font-medium">{device.deviceName}</span>
                                            </div>
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
