import { useState, useEffect } from "react";
import { Smartphone, MapPin, LogOut, Monitor, Tablet, Search } from "lucide-react";
import { devicesService } from "../../services/devices";

export function Devices() {
    const [devices, setDevices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const limit = 20;

    useEffect(() => {
        const fetchInitialDevices = async () => {
            try {
                setLoading(true);
                const params = { limit, offset: 0 };
                if (searchTerm) params.search = searchTerm;
                
                const response = await devicesService.getDevices(params);
                if (response && response.data) {
                    setDevices(response.data.devices || []);
                    setHasMore(response.data.pagination?.has_more || false);
                    setOffset(response.data.pagination?.offset || limit);
                }
            } catch (error) {
                console.error("Failed to fetch initial devices", error);
            } finally {
                setLoading(false);
            }
        };

        const timeoutId = setTimeout(() => {
            fetchInitialDevices();
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [searchTerm]);

    const handleScroll = async (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight + 50;
        if (bottom && hasMore && !isFetchingMore) {
            try {
                setIsFetchingMore(true);
                const params = { limit, offset };
                if (searchTerm) params.search = searchTerm;
                
                const response = await devicesService.getDevices(params);
                if (response && response.data) {
                    setDevices(prev => [...prev, ...(response.data.devices || [])]);
                    setHasMore(response.data.pagination?.has_more || false);
                    setOffset(response.data.pagination?.offset || offset + limit);
                }
            } catch (error) {
                console.error("Failed to fetch more devices", error);
            } finally {
                setIsFetchingMore(false);
            }
        }
    };

    const handleForceLogout = async (deviceId) => {
        if (!window.confirm("Are you sure you want to force logout this device?")) return;
        
        try {
            await devicesService.forceLogout(deviceId);
            // Remove the device from the list after successful logout
            setDevices(prev => prev.filter(d => d.device_id !== deviceId));
        } catch (error) {
            // Check for 409 softly as per requirements, handled in apiClient generally
            // but we can remove it here if it's already logged out.
            if (error?.response?.status === 409) {
                 setDevices(prev => prev.filter(d => d.device_id !== deviceId));
            } else {
                 console.error("Failed to force logout", error);
            }
        }
    };

    const getDeviceIcon = (deviceName = "") => {
        const name = deviceName.toLowerCase();
        if (name.includes("ipad") || name.includes("tablet")) return Tablet;
        if (name.includes("windows") || name.includes("mac") || name.includes("desktop")) return Monitor;
        return Smartphone;
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
                            {loading && offset === 0 ? (
                                <tr>
                                    <td colSpan="6" className="py-8 text-center text-gray-400">Loading devices...</td>
                                </tr>
                            ) : devices.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="py-8 text-center text-gray-400">No devices found.</td>
                                </tr>
                            ) : (
                                devices.map((device, idx) => {
                                    const Icon = getDeviceIcon(device.device_name);
                                    return (
                                        <tr key={`${device.device_id}-${idx}`} className="table-row">
                                            <td className="py-4 px-4 text-sm font-mono">{device.device_id}</td>
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00C2FF]/20 to-[#1E90FF]/20 flex items-center justify-center">
                                                        <Icon size={18} className="text-[#00C2FF]" />
                                                    </div>
                                                    <span className="text-sm font-medium">{device.device_name}</span>
                                                </div>
                                            </td>

                                            <td className="py-4 px-4 text-sm font-mono text-gray-400">
                                                {/* The API spec didn't mention IP explicitly, keeping placeholder or empty if undefined */}
                                                {device.ip_address || "N/A"}
                                            </td>
                                            <td className="py-4 px-4 text-sm text-gray-400">
                                                <div className="flex items-center gap-2">
                                                    <MapPin size={14} className="text-[#00C2FF]" />
                                                    {device.location || "Unknown"}
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 text-sm font-mono text-gray-400">
                                                {device.last_active ? new Date(device.last_active).toLocaleString() : "Unknown"}
                                            </td>
                                            <td className="py-4 px-4">
                                                <button 
                                                    onClick={() => handleForceLogout(device.device_id)}
                                                    className="flex items-center gap-2 px-3 py-2 hover:bg-[#FF3B5C]/10 rounded-lg transition-colors group text-sm"
                                                >
                                                    <LogOut size={14} className="text-gray-400 group-hover:text-[#FF3B5C]" />
                                                    <span className="text-gray-400 group-hover:text-[#FF3B5C]">
                                                        Force Logout
                                                    </span>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                            {isFetchingMore && (
                                <tr>
                                    <td colSpan="6" className="py-4 text-center text-sm text-gray-400">Loading more...</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
