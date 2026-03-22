import { useState } from "react";
import { Search, Download, Filter, CheckCircle2, XCircle, Clock } from "lucide-react";

const authLogsData = [
    {
        id: "LOG-48923",
        timestamp: "2024-03-04 14:23:11",
        userId: "USR-8492",
        userName: "Sarah Mitchell",
        status: "Success",
        ipAddress: "192.168.1.45",
        location: "Colombo, LK",
    },
    {
        id: "LOG-48922",
        timestamp: "2024-03-04 14:21:45",
        userId: "USR-7341",
        userName: "James Rodriguez",
        status: "Success",
        ipAddress: "10.0.0.112",
        location: "Kandy, LK",
    },
    {
        id: "LOG-48921",
        timestamp: "2024-03-04 14:19:32",
        userId: "USR-6629",
        userName: "Emily Chen",
        status: "Failed",
        ipAddress: "172.16.0.89",
        location: "Galle, LK",
    },
    {
        id: "LOG-48920",
        timestamp: "2024-03-04 14:18:07",
        userId: "USR-9012",
        userName: "Michael Brown",
        status: "Success",
        ipAddress: "192.168.1.67",
        location: "Negombo, LK",
    },
    {
        id: "LOG-48919",
        timestamp: "2024-03-04 14:15:54",
        userId: "USR-4521",
        userName: "Jessica Taylor",
        status: "Success",
        ipAddress: "10.0.0.234",
        location: "Jaffna, LK",
    },
    {
        id: "LOG-48918",
        timestamp: "2024-03-04 14:12:33",
        userId: "USR-3318",
        userName: "David Kim",
        status: "Failed",
        ipAddress: "192.168.1.123",
        location: "Matara, LK",
    },
    {
        id: "LOG-48917",
        timestamp: "2024-03-04 14:10:18",
        userId: "USR-2207",
        userName: "Amanda White",
        status: "Success",
        ipAddress: "172.16.0.45",
        location: "Trincomalee, LK",
    },
    {
        id: "LOG-48916",
        timestamp: "2024-03-04 14:08:22",
        userId: "USR-1156",
        userName: "Robert Garcia",
        status: "Failed",
        ipAddress: "10.0.0.178",
        location: "Batticaloa, LK",
    },
];

export function AuthLogs() {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [showFilters, setShowFilters] = useState(false);

    const filteredLogs = authLogsData.filter((log) => {
        const matchesSearch =
            log.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.timestamp.includes(searchTerm);
        const matchesStatus = statusFilter === "all" || log.status.toLowerCase() === statusFilter;
        
        let matchesDate = true;
        if (fromDate || toDate) {
            const logDate = new Date(log.timestamp);
            if (fromDate && new Date(fromDate) > logDate) matchesDate = false;
            if (toDate) {
                const toDateObj = new Date(toDate);
                toDateObj.setHours(23, 59, 59, 999);
                if (toDateObj < logDate) matchesDate = false;
            }
        }
        
        return matchesSearch && matchesStatus && matchesDate;
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
            <div className="glass-panel p-4 rounded-xl border border-[#00C2FF]/20 space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 flex items-center gap-2 glass-panel px-4 py-2 rounded-lg border border-[#00C2FF]/20">
                        <Search size={18} className="text-[#00C2FF]" />
                        <input
                            type="text"
                            placeholder="Search by ID, name, or time..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-transparent border-none outline-none flex-1 text-sm outline-none"
                        />
                    </div>
                    <button 
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center gap-2 px-4 py-2 glass-panel rounded-lg border border-[#00C2FF]/20 hover:bg-[#00C2FF]/10 transition-colors"
                    >
                        <Filter size={18} className="text-[#00C2FF]" />
                        <span>Filters</span>
                    </button>
                </div>
                {showFilters && (
                    <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-[#00C2FF]/20">
                        <div className="flex items-center gap-2">
                            <label className="text-sm text-gray-400">Status:</label>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="bg-transparent border border-[#00C2FF]/20 rounded-lg px-3 py-1.5 text-sm outline-none text-[#00C2FF]"
                            >
                                <option value="all" className="bg-[#0A0F1C]">All Status</option>
                                <option value="success" className="bg-[#0A0F1C]">Success</option>
                                <option value="failed" className="bg-[#0A0F1C]">Failed</option>
                            </select>
                        </div>

                        <div className="flex items-center gap-2">
                            <label className="text-sm text-gray-400">From:</label>
                            <input 
                                type="date" 
                                value={fromDate}
                                onChange={(e) => setFromDate(e.target.value)}
                                className="bg-transparent border border-[#00C2FF]/20 rounded-lg px-3 py-1.5 text-sm outline-none text-[#00C2FF]"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <label className="text-sm text-gray-400">To:</label>
                            <input 
                                type="date" 
                                value={toDate}
                                onChange={(e) => setToDate(e.target.value)}
                                className="bg-transparent border border-[#00C2FF]/20 rounded-lg px-3 py-1.5 text-sm outline-none text-[#00C2FF]"
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Logs Table */}
            <div className="glass-panel rounded-xl border border-[#00C2FF]/20 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-[#00C2FF]/20 bg-[#00C2FF]/5">
                                <th className="text-left py-4 px-4 text-sm font-semibold text-[#00C2FF]">
                                    User ID
                                </th>
                                <th className="text-left py-4 px-4 text-sm font-semibold text-[#00C2FF]">
                                    Timestamp
                                </th>
                                <th className="text-left py-4 px-4 text-sm font-semibold text-[#00C2FF]">
                                    Name
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
                            </tr>
                        </thead>
                        <tbody>
                            {filteredLogs.map((log) => (
                                <tr key={log.id} className="table-row">
                                    <td className="py-4 px-4 text-sm font-mono">{log.userId}</td>
                                    <td className="py-4 px-4 text-sm font-mono text-gray-400">
                                        {log.timestamp}
                                    </td>
                                    <td className="py-4 px-4">
                                        <div className="text-sm font-medium">{log.userName}</div>
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
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
