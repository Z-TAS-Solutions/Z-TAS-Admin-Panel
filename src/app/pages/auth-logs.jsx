import { useState } from "react";
import { Search, Download, Filter, CheckCircle2, XCircle, Clock } from "lucide-react";

const authLogsData = [
    {
        id: "LOG-48923",
        timestamp: "2024-03-04 14:23:11",
        userId: "USR-8492",
        userName: "Sarah Mitchell",
        method: "Passkey",
        status: "Success",
        ipAddress: "192.168.1.45",
        location: "New York, US",
        device: "iPhone 13 Pro",
    },
    {
        id: "LOG-48922",
        timestamp: "2024-03-04 14:21:45",
        userId: "USR-7341",
        userName: "James Rodriguez",
        method: "OTP",
        status: "Success",
        ipAddress: "10.0.0.112",
        location: "San Francisco, US",
        device: "Chrome - Windows",
    },
    {
        id: "LOG-48921",
        timestamp: "2024-03-04 14:19:32",
        userId: "USR-6629",
        userName: "Emily Chen",
        method: "Passkey",
        status: "Failed",
        ipAddress: "172.16.0.89",
        location: "Los Angeles, US",
        device: "Safari - MacOS",
    },
    {
        id: "LOG-48920",
        timestamp: "2024-03-04 14:18:07",
        userId: "USR-9012",
        userName: "Michael Brown",
        method: "OTP",
        status: "Success",
        ipAddress: "192.168.1.67",
        location: "Chicago, US",
        device: "Android - Samsung",
    },
    {
        id: "LOG-48919",
        timestamp: "2024-03-04 14:15:54",
        userId: "USR-4521",
        userName: "Jessica Taylor",
        method: "Passkey",
        status: "Success",
        ipAddress: "10.0.0.234",
        location: "Boston, US",
        device: "Firefox - Linux",
    },
    {
        id: "LOG-48918",
        timestamp: "2024-03-04 14:12:33",
        userId: "USR-3318",
        userName: "David Kim",
        method: "OTP",
        status: "Failed",
        ipAddress: "192.168.1.123",
        location: "Seattle, US",
        device: "Chrome - MacOS",
    },
    {
        id: "LOG-48917",
        timestamp: "2024-03-04 14:10:18",
        userId: "USR-2207",
        userName: "Amanda White",
        method: "Passkey",
        status: "Success",
        ipAddress: "172.16.0.45",
        location: "Miami, US",
        device: "Edge - Windows",
    },
    {
        id: "LOG-48916",
        timestamp: "2024-03-04 14:08:22",
        userId: "USR-1156",
        userName: "Robert Garcia",
        method: "OTP",
        status: "Failed",
        ipAddress: "10.0.0.178",
        location: "Denver, US",
        device: "Safari - iOS",
    },
];

export function AuthLogs() {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [methodFilter, setMethodFilter] = useState("all");

    const filteredLogs = authLogsData.filter((log) => {
        const matchesSearch =
            log.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.ipAddress.includes(searchTerm);
        const matchesStatus = statusFilter === "all" || log.status.toLowerCase() === statusFilter;
        const matchesMethod = methodFilter === "all" || log.method.toLowerCase() === methodFilter;
        return matchesSearch && matchesStatus && matchesMethod;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold neon-text">Authentication Logs</h1>
                    <p className="text-sm text-gray-400 mt-1">
                        Monitor and analyze all authentication attempts across your system
                    </p>
                </div>
                <button className="flex items-center gap-2 gradient-button px-6 py-2 rounded-lg font-semibold">
                    <Download size={18} />
                    Export Logs
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="glass-panel p-4 rounded-xl border border-[#00C2FF]/20">
                    <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 size={18} className="text-[#00FF88]" />
                        <p className="text-sm text-gray-400">Successful (24h)</p>
                    </div>
                    <p className="text-2xl font-bold text-[#00FF88]">8,234</p>
                </div>
                <div className="glass-panel p-4 rounded-xl border border-[#00C2FF]/20">
                    <div className="flex items-center gap-2 mb-2">
                        <XCircle size={18} className="text-[#FF3B5C]" />
                        <p className="text-sm text-gray-400">Failed (24h)</p>
                    </div>
                    <p className="text-2xl font-bold text-[#FF3B5C]">127</p>
                </div>
                <div className="glass-panel p-4 rounded-xl border border-[#00C2FF]/20">
                    <div className="flex items-center gap-2 mb-2">
                        <Clock size={18} className="text-[#00C2FF]" />
                        <p className="text-sm text-gray-400">Avg Response Time</p>
                    </div>
                    <p className="text-2xl font-bold neon-text">124ms</p>
                </div>
                <div className="glass-panel p-4 rounded-xl border border-[#00C2FF]/20">
                    <div className="flex items-center gap-2 mb-2">
                        <Filter size={18} className="text-[#FFB800]" />
                        <p className="text-sm text-gray-400">Suspicious</p>
                    </div>
                    <p className="text-2xl font-bold text-[#FFB800]">8</p>
                </div>
            </div>

            {/* Filters */}
            <div className="glass-panel p-4 rounded-xl border border-[#00C2FF]/20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2 glass-panel px-4 py-2 rounded-lg border border-[#00C2FF]/20">
                        <Search size={18} className="text-[#00C2FF]" />
                        <input
                            type="text"
                            placeholder="Search by user ID, name, or IP..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-transparent border-none outline-none flex-1 text-sm"
                        />
                    </div>

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="glass-panel px-4 py-2 rounded-lg border border-[#00C2FF]/20 bg-[#0A0F1C] outline-none text-sm"
                    >
                        <option value="all">All Status</option>
                        <option value="success">Success</option>
                        <option value="failed">Failed</option>
                    </select>

                    <select
                        value={methodFilter}
                        onChange={(e) => setMethodFilter(e.target.value)}
                        className="glass-panel px-4 py-2 rounded-lg border border-[#00C2FF]/20 bg-[#0A0F1C] outline-none text-sm"
                    >
                        <option value="all">All Methods</option>
                        <option value="otp">OTP</option>
                        <option value="passkey">Passkey</option>
                    </select>
                </div>
            </div>

            {/* Logs Table */}
            <div className="glass-panel rounded-xl border border-[#00C2FF]/20 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-[#00C2FF]/20 bg-[#00C2FF]/5">
                                <th className="text-left py-4 px-4 text-sm font-semibold text-[#00C2FF]">
                                    Log ID
                                </th>
                                <th className="text-left py-4 px-4 text-sm font-semibold text-[#00C2FF]">
                                    Timestamp
                                </th>
                                <th className="text-left py-4 px-4 text-sm font-semibold text-[#00C2FF]">
                                    User
                                </th>
                                <th className="text-left py-4 px-4 text-sm font-semibold text-[#00C2FF]">
                                    Method
                                </th>
                                <th className="text-left py-4 px-4 text-sm font-semibold text-[#00C2FF]">
                                    Status
                                </th>
                                <th className="text-left py-4 px-4 text-sm font-semibold text-[#00C2FF]">
                                    IP Address
                                </th>
                                <th className="text-left py-4 px-4 text-sm font-semibold text-[#00C2FF]">
                                    Location
                                </th>
                                <th className="text-left py-4 px-4 text-sm font-semibold text-[#00C2FF]">
                                    Device
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredLogs.map((log) => (
                                <tr key={log.id} className="table-row">
                                    <td className="py-4 px-4 text-sm font-mono">{log.id}</td>
                                    <td className="py-4 px-4 text-sm font-mono text-gray-400">
                                        {log.timestamp}
                                    </td>
                                    <td className="py-4 px-4">
                                        <div>
                                            <p className="text-sm font-medium">{log.userName}</p>
                                            <p className="text-xs text-gray-400 font-mono">{log.userId}</p>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4 text-sm">
                                        <span className="px-2 py-1 rounded bg-[#00C2FF]/10 text-[#00C2FF] text-xs">
                                            {log.method}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 text-sm">
                                        <span
                                            className={`px-2 py-1 rounded text-xs flex items-center gap-1 w-fit ${log.status === "Success"
                                                ? "bg-[#00FF88]/10 text-[#00FF88]"
                                                : "bg-[#FF3B5C]/10 text-[#FF3B5C]"
                                                }`}
                                        >
                                            {log.status === "Success" ? (
                                                <CheckCircle2 size={12} />
                                            ) : (
                                                <XCircle size={12} />
                                            )}
                                            {log.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 text-sm font-mono text-gray-400">
                                        {log.ipAddress}
                                    </td>
                                    <td className="py-4 px-4 text-sm text-gray-400">{log.location}</td>
                                    <td className="py-4 px-4 text-sm text-gray-400">{log.device}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
