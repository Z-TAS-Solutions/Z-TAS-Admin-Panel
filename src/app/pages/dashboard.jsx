import { useState, useEffect } from "react";
import { dashboardService } from "../../services/dashboard";
import { systemService } from "../../services/security";
import {
  Users,
  Activity,
  CheckCircle2,
  XCircle,
  Key,
  Fingerprint,
  AlertTriangle,
  TrendingUp,
  BarChart3,
} from "lucide-react";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
} from "recharts";

const authTrendData = [];

const recentActivity = [];

const monthlyData = [
  { month: "Jan", users: 8234, auths: 45678, failures: 234 },
  { month: "Feb", users: 9456, auths: 52341, failures: 189 },
  { month: "Mar", users: 10892, auths: 61234, failures: 156 },
  { month: "Apr", users: 11234, auths: 67892, failures: 203 },
  { month: "May", users: 11789, auths: 71456, failures: 178 },
  { month: "Jun", users: 12847, auths: 78234, failures: 145 },
];

const StatCard = ({ title, value, icon: Icon, trend, trendValue }) => (
  <div className="glass-panel p-6 rounded-xl border border-[#00C2FF]/20 stat-card">
    <div className="flex items-start justify-between mb-4">
      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#00C2FF]/20 to-[#1E90FF]/20 flex items-center justify-center">
        <Icon size={24} className="text-[#00C2FF]" />
      </div>
      {trend && (
        <div
          className={`flex items-center gap-1 text-xs px-2 py-1 rounded ${trend === "up" ? "bg-[#00FF88]/10 text-[#00FF88]" : "bg-[#FF3B5C]/10 text-[#FF3B5C]"
            }`}
        >
          <TrendingUp
            size={12}
            className={trend === "down" ? "rotate-180" : ""}
          />
          {trendValue}
        </div>
      )}
    </div>
    <h3 className="text-2xl font-bold neon-text mb-1">{value}</h3>
    <p className="text-sm text-gray-400">{title}</p>
  </div>
);

export function Dashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [authTrends, setAuthTrends] = useState([]);
  const [recentAuth, setRecentAuth] = useState([]);
  const [latency, setLatency] = useState("--");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [analyticsRes, trendsRes, activityRes] = await Promise.all([
          dashboardService.getAnalytics(),
          dashboardService.getAuthTrends({ interval: 'hour' }),
          dashboardService.getRecentActivity({ page: 1, limit: 10 }),
        ]);
        console.log("Analytics:", analyticsRes);
        setAnalytics(analyticsRes);

        // Format auth trends for recharts
        const formattedTrends = (trendsRes.data || []).map(item => ({
          time: new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          successful: item.successCount || 0,
          failed: item.failureCount || 0
        }));
        setAuthTrends(formattedTrends);

        setRecentAuth(activityRes.data || []);
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();

    // Setup Ping Latency check
    const checkPing = async () => {
      try {
        const t0 = Date.now();
        await systemService.ping();
        const t1 = Date.now();
        setLatency(`${t1 - t0}ms`);
      } catch (err) {
        console.warn("Ping failed");
      }
    };
    checkPing();
  }, []);

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Registered Users"
          value={analytics ? analytics.totalUsers.toLocaleString() : "..."}
          icon={Users}
        />
        <StatCard
          title="Active Sessions"
          value={analytics ? analytics.activeSessions.toLocaleString() : "..."}
          icon={Activity}
        />
        <StatCard
          title="Success Rate"
          value={analytics ? `${analytics.successRate}%` : "..."}
          icon={CheckCircle2}
        />
        <StatCard title="Average Response Time" value={latency} icon={Activity} />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6">
        {/* Authentication Trends */}
        <div className="glass-panel p-6 rounded-xl border border-[#00C2FF]/20">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Activity size={20} className="text-[#00C2FF]" />
            Authentication Trends (24 Hours)
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            {loading ? (
              <div className="flex items-center justify-center h-full text-gray-400">Loading chart...</div>
            ) : (
              <LineChart data={authTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#00C2FF20" />
                <XAxis dataKey="time" stroke="#ffffff60" />
                <YAxis stroke="#ffffff60" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0A0F1C",
                    border: "1px solid #00C2FF40",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="successful"
                  stroke="#00FF88"
                  strokeWidth={2}
                  dot={{ fill: "#00FF88", r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="failed"
                  stroke="#FF3B5C"
                  strokeWidth={2}
                  dot={{ fill: "#FF3B5C", r: 4 }}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>


      </div>

      {/* Monthly Overview */}
      <div className="glass-panel p-6 rounded-xl border border-[#00C2FF]/20 mb-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <BarChart3 size={20} className="text-[#00C2FF]" />
          Monthly Overview
        </h2>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#00C2FF20" />
            <XAxis dataKey="month" stroke="#ffffff60" />
            <YAxis stroke="#ffffff60" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0A0F1C",
                border: "1px solid #00C2FF40",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Bar dataKey="users" fill="#00C2FF" name="Total Users" />
            <Bar dataKey="auths" fill="#00FF88" name="Authentications" />
            <Bar dataKey="failures" fill="#FF3B5C" name="Failures" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Activity Table */}
      <div className="glass-panel p-6 rounded-xl border border-[#00C2FF]/20">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Activity size={20} className="text-[#00C2FF]" />
          Recent Authentication Activity
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#00C2FF]/20">
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#00C2FF]">
                  User ID
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#00C2FF]">
                  Device
                </th>

                <th className="text-left py-3 px-4 text-sm font-semibold text-[#00C2FF]">
                  Status
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#00C2FF]">
                  Timestamp
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-400">Loading recent activity...</td>
                </tr>
              ) : recentAuth.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-400">No recent activity</td>
                </tr>
              ) : (
                recentAuth.map((activity, index) => (
                  <tr key={index} className="table-row">
                    <td className="py-3 px-4 text-sm font-mono">{activity.userId}</td>
                    <td className="py-3 px-4 text-sm">{activity.device}</td>

                    <td className="py-3 px-4 text-sm">
                      <span
                        className={`px-2 py-1 rounded text-xs ${activity.status === "success"
                          ? "bg-[#00FF88]/10 text-[#00FF88]"
                          : "bg-[#FF3B5C]/10 text-[#FF3B5C]"
                          }`}
                      >
                        {activity.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-400 font-mono">
                      {new Date(activity.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
