import { BarChart3, TrendingUp, Users, Activity } from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const monthlyData = [
  { month: "Jan", users: 8234, auths: 45678, failures: 234 },
  { month: "Feb", users: 9456, auths: 52341, failures: 189 },
  { month: "Mar", users: 10892, auths: 61234, failures: 156 },
  { month: "Apr", users: 11234, auths: 67892, failures: 203 },
  { month: "May", users: 11789, auths: 71456, failures: 178 },
  { month: "Jun", users: 12847, auths: 78234, failures: 145 },
];

const userGrowthData = [
  { week: "Week 1", newUsers: 234, activeUsers: 8934 },
  { week: "Week 2", newUsers: 312, activeUsers: 9123 },
  { week: "Week 3", newUsers: 289, activeUsers: 9445 },
  { week: "Week 4", newUsers: 356, activeUsers: 9789 },
];

export function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold neon-text">System Analytics</h1>
        <p className="text-sm text-gray-400 mt-1">
          Comprehensive analytics and insights into system performance
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-panel p-4 rounded-xl border border-[#00C2FF]/20">
          <div className="flex items-center gap-2 mb-2">
            <Users size={18} className="text-[#00C2FF]" />
            <p className="text-sm text-gray-400">User Growth</p>
          </div>
          <p className="text-2xl font-bold neon-text">+2,145</p>
          <p className="text-xs text-[#00FF88] mt-1">↑ 18% this month</p>
        </div>
        <div className="glass-panel p-4 rounded-xl border border-[#00C2FF]/20">
          <div className="flex items-center gap-2 mb-2">
            <Activity size={18} className="text-[#00C2FF]" />
            <p className="text-sm text-gray-400">Auth Success Rate</p>
          </div>
          <p className="text-2xl font-bold text-[#00FF88]">98.5%</p>
          <p className="text-xs text-[#00FF88] mt-1">↑ 2.3% improvement</p>
        </div>
        <div className="glass-panel p-4 rounded-xl border border-[#00C2FF]/20">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={18} className="text-[#00C2FF]" />
            <p className="text-sm text-gray-400">Avg Session Time</p>
          </div>
          <p className="text-2xl font-bold neon-text">24.5m</p>
          <p className="text-xs text-[#00FF88] mt-1">↑ 5% increase</p>
        </div>
        <div className="glass-panel p-4 rounded-xl border border-[#00C2FF]/20">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 size={18} className="text-[#00C2FF]" />
            <p className="text-sm text-gray-400">Peak Usage Time</p>
          </div>
          <p className="text-2xl font-bold neon-text">2-4 PM</p>
          <p className="text-xs text-gray-400 mt-1">EST timezone</p>
        </div>
      </div>

      {/* Monthly Overview */}
      <div className="glass-panel p-6 rounded-xl border border-[#00C2FF]/20">
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

      {/* User Growth Trend */}
      <div className="glass-panel p-6 rounded-xl border border-[#00C2FF]/20">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <TrendingUp size={20} className="text-[#00C2FF]" />
          User Growth Trend (Last 4 Weeks)
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={userGrowthData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#00C2FF20" />
            <XAxis dataKey="week" stroke="#ffffff60" />
            <YAxis stroke="#ffffff60" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0A0F1C",
                border: "1px solid #00C2FF40",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="newUsers"
              stroke="#00C2FF"
              fill="url(#colorNew)"
              name="New Users"
            />
            <Area
              type="monotone"
              dataKey="activeUsers"
              stroke="#00FF88"
              fill="url(#colorActive)"
              name="Active Users"
            />
            <defs>
              <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00C2FF" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#00C2FF" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00FF88" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#00FF88" stopOpacity={0} />
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
