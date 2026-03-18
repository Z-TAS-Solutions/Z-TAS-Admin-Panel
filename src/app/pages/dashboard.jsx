import {
  Users,
  Activity,
  CheckCircle2,
  XCircle,
  Key,
  Fingerprint,
  AlertTriangle,
  TrendingUp,
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
} from "recharts";

const authTrendData = [
  { time: "00:00", successful: 245, failed: 12 },
  { time: "04:00", successful: 189, failed: 8 },
  { time: "08:00", successful: 678, failed: 23 },
  { time: "12:00", successful: 892, failed: 34 },
  { time: "16:00", successful: 734, failed: 19 },
  { time: "20:00", successful: 456, failed: 15 },
];

const mfaMethodData = [
  { name: "OTP", value: 65, color: "#00C2FF" },
  { name: "Passkey", value: 35, color: "#1E90FF" },
];

const recentActivity = [
  {
    userId: "USR-8492",
    device: "iPhone 13 Pro",
    method: "Passkey",
    status: "Success",
    timestamp: "2024-03-04 14:23:11",
  },
  {
    userId: "USR-7341",
    device: "Chrome - Windows",
    method: "OTP",
    status: "Success",
    timestamp: "2024-03-04 14:21:45",
  },
  {
    userId: "USR-6629",
    device: "Safari - MacOS",
    method: "Passkey",
    status: "Failed",
    timestamp: "2024-03-04 14:19:32",
  },
  {
    userId: "USR-9012",
    device: "Android - Samsung",
    method: "OTP",
    status: "Success",
    timestamp: "2024-03-04 14:18:07",
  },
  {
    userId: "USR-4521",
    device: "Firefox - Linux",
    method: "Passkey",
    status: "Success",
    timestamp: "2024-03-04 14:15:54",
  },
];

const StatCard = ({ title, value, icon: Icon, trend, trendValue }) => (
  <div className="glass-panel p-6 rounded-xl border border-[#00C2FF]/20 stat-card">
    <div className="flex items-start justify-between mb-4">
      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#00C2FF]/20 to-[#1E90FF]/20 flex items-center justify-center">
        <Icon size={24} className="text-[#00C2FF]" />
      </div>
      {trend && (
        <div
          className={`flex items-center gap-1 text-xs px-2 py-1 rounded ${
            trend === "up" ? "bg-[#00FF88]/10 text-[#00FF88]" : "bg-[#FF3B5C]/10 text-[#FF3B5C]"
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
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Registered Users"
          value="12,847"
          icon={Users}
          trend="up"
          trendValue="+12%"
        />
        <StatCard
          title="Active Sessions"
          value="3,492"
          icon={Activity}
          trend="up"
          trendValue="+8%"
        />
        <StatCard
          title="Successful Auth (24h)"
          value="8,234"
          icon={CheckCircle2}
          trend="up"
          trendValue="+15%"
        />
        <StatCard
          title="Failed Attempts (24h)"
          value="127"
          icon={XCircle}
          trend="down"
          trendValue="-3%"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="OTP Requests Today" value="5,621" icon={Key} />
        <StatCard title="Passkey Registrations" value="4,512" icon={Fingerprint} />
        <StatCard
          title="Suspicious Activity Alerts"
          value="8"
          icon={AlertTriangle}
        />
        <StatCard title="Average Response Time" value="124ms" icon={Activity} />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Authentication Trends */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-xl border border-[#00C2FF]/20">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Activity size={20} className="text-[#00C2FF]" />
            Authentication Trends (24 Hours)
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={authTrendData}>
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
          </ResponsiveContainer>
        </div>

        {/* MFA Method Distribution */}
        <div className="glass-panel p-6 rounded-xl border border-[#00C2FF]/20">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Key size={20} className="text-[#00C2FF]" />
            MFA Method Usage
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={mfaMethodData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {mfaMethodData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0A0F1C",
                  border: "1px solid #00C2FF40",
                  borderRadius: "8px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
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
                  Method
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
              {recentActivity.map((activity, index) => (
                <tr key={index} className="table-row">
                  <td className="py-3 px-4 text-sm font-mono">{activity.userId}</td>
                  <td className="py-3 px-4 text-sm">{activity.device}</td>
                  <td className="py-3 px-4 text-sm">
                    <span className="px-2 py-1 rounded bg-[#00C2FF]/10 text-[#00C2FF] text-xs">
                      {activity.method}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        activity.status === "Success"
                          ? "bg-[#00FF88]/10 text-[#00FF88]"
                          : "bg-[#FF3B5C]/10 text-[#FF3B5C]"
                      }`}
                    >
                      {activity.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-400 font-mono">
                    {activity.timestamp}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
