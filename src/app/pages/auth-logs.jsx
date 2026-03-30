import { useState, useEffect } from "react";
import { Search, Download, Filter, CheckCircle2, XCircle, Clock } from "lucide-react";
import { authLogsService } from "../../services/authLogs";
import { systemService } from "../../services/security";

export function AuthLogs() {
    const [logs, setLogs] = useState([]);
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [latency, setLatency] = useState("--");
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const limit = 20;

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [analyticsRes, latencyRes] = await Promise.allSettled([
                    authLogsService.getAnalytics(),
                    (async () => {
                        const t0 = Date.now();
                        await systemService.ping();
                        return `${Date.now() - t0}ms`;
                    })()
                ]);

                if (analyticsRes.status === "fulfilled" && analyticsRes.value) {
                    setAnalytics(analyticsRes.value.data?.metrics);
                }

                if (latencyRes.status === "fulfilled") {
                    setLatency(latencyRes.value);
                }
            } catch (error) {
                console.error("Failed to load analytics", error);
            }
        };

        fetchInitialData();
    }, []);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                setLoading(true);
                const params = {
                    limit,
                    offset: (page - 1) * limit
                };

                if (searchTerm) params.search = searchTerm;
                if (statusFilter !== "all") params.status = statusFilter;
                
                if (fromDate) params.from = new Date(fromDate).getTime();
                if (toDate) {
                    const toDateObj = new Date(toDate);
                    toDateObj.setHours(23, 59, 59, 999);
                    params.to = toDateObj.getTime();
                }

                const response = await authLogsService.getLogs(params);
                if (response && response.data) {
                    setLogs(response.data.logs || []);
                    // Compute total theoretically or handle infinite scroll logic based on API details.
                    // The API returns { returned, has_more, offset, limit } or similar.
                    // For typical pagination we will assume total exists or we calculate based on length:
                    setTotal((response.data.pagination?.offset || 0) + (response.data.logs?.length || 0) + (response.data.pagination?.has_more ? 1 : 0));
                }
            } catch (error) {
                console.error("Failed to load logs", error);
            } finally {
                setLoading(false);
            }
        };
        
        const timeoutId = setTimeout(() => {
            fetchLogs();
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [searchTerm, statusFilter, fromDate, toDate, page]);

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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="glass-panel p-4 rounded-xl border border-[#00C2FF]/20">
                    <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 size={18} className="text-[#00FF88]" />
                        <p className="text-sm text-gray-400">Successful (24h)</p>
                    </div>
                    <p className="text-2xl font-bold text-[#00FF88]">{analytics ? analytics.successful_logins.toLocaleString() : "..."}</p>
                </div>
                <div className="glass-panel p-4 rounded-xl border border-[#00C2FF]/20">
                    <div className="flex items-center gap-2 mb-2">
                        <XCircle size={18} className="text-[#FF3B5C]" />
                        <p className="text-sm text-gray-400">Failed (24h)</p>
                    </div>
                    <p className="text-2xl font-bold text-[#FF3B5C]">{analytics ? analytics.failed_logins.toLocaleString() : "..."}</p>
                </div>
                <div className="glass-panel p-4 rounded-xl border border-[#00C2FF]/20">
                    <div className="flex items-center gap-2 mb-2">
                        <Clock size={18} className="text-[#00C2FF]" />
                        <p className="text-sm text-gray-400">Avg Response Time</p>
                    </div>
                    <p className="text-2xl font-bold neon-text">{latency}</p>
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
                                    Device
                                </th>
                                <th className="text-left py-4 px-4 text-sm font-semibold text-[#00C2FF]">
                                    Location
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="py-8 text-center text-gray-400">Loading logs...</td>
                                </tr>
                            ) : logs.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="py-8 text-center text-gray-400">No logs found.</td>
                                </tr>
                            ) : (
                                logs.map((log) => (
                                    <tr key={log.log_id || log.id} className="table-row">
                                        <td className="py-4 px-4 text-sm font-mono">{log.user_id || log.userId}</td>
                                        <td className="py-4 px-4 text-sm font-mono text-gray-400">
                                            {log.timestamp ? new Date(log.timestamp).toLocaleString() : "Unknown"}
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="text-sm font-medium">{log.user_name || log.userName}</div>
                                        </td>
                                        <td className="py-4 px-4 text-sm">
                                            <span
                                                className={`px-2 py-1 rounded text-xs flex items-center gap-1 w-fit ${
                                                    (log.status || "").toLowerCase() === "success"
                                                    ? "bg-[#00FF88]/10 text-[#00FF88]"
                                                    : "bg-[#FF3B5C]/10 text-[#FF3B5C]"
                                                    }`}
                                            >
                                                {(log.status || "").toLowerCase() === "success" ? (
                                                    <CheckCircle2 size={12} />
                                                ) : (
                                                    <XCircle size={12} />
                                                )}
                                                {/* Capitalize first letter */}
                                                {log.status ? log.status.charAt(0).toUpperCase() + log.status.slice(1) : "Unknown"}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-sm font-mono text-gray-400">
                                            {log.device || "Unknown"}
                                        </td>
                                        <td className="py-4 px-4 text-sm text-gray-400">{log.location || "Unknown"}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination Controls */}
            {!loading && total > limit && (
                <div className="flex items-center justify-between mt-4">
                <span className="text-sm text-gray-400">
                    Showing {(page - 1) * limit + 1} to {Math.min(page * limit, total)} of {total} logs
                </span>
                <div className="flex gap-2">
                    <button 
                        disabled={page === 1}
                        onClick={() => setPage(p => p - 1)}
                        className="px-3 py-1 rounded border border-[#00C2FF]/20 text-[#00C2FF] disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <button 
                        disabled={page * limit >= total}
                        onClick={() => setPage(p => p + 1)}
                        className="px-3 py-1 rounded border border-[#00C2FF]/20 text-[#00C2FF] disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
                </div>
            )}
        </div>
    );
}
