 import { AlertTriangle, Shield, MapPin, Clock } from "lucide-react";

const alertsData = [
  {
    id: "ALR-9384",
    type: "suspicious",
    severity: "high",
    title: "Multiple Failed Login Attempts",
    description: "User USR-6629 has 5 failed login attempts from IP 172.16.0.89",
    location: "Los Angeles, US",
    timestamp: "2024-03-04 14:19:32",
  },
  {
    id: "ALR-9383",
    type: "device",
    severity: "medium",
    title: "Unrecognized Device Login",
    description: "New device detected for user USR-4521 from Chicago, US",
    location: "Chicago, US",
    timestamp: "2024-03-04 13:45:18",
  },
  {
    id: "ALR-9382",
    type: "otp",
    severity: "low",
    title: "OTP Request Spike",
    description: "Unusual increase in OTP requests detected (45% above average)",
    location: "System-wide",
    timestamp: "2024-03-04 12:30:45",
  },
  {
    id: "ALR-9381",
    type: "suspicious",
    severity: "high",
    title: "Suspicious Geographic Login",
    description: "User USR-7341 logged in from two different continents within 10 minutes",
    location: "Multiple Locations",
    timestamp: "2024-03-04 11:22:11",
  },
  {
    id: "ALR-9380",
    type: "account",
    severity: "medium",
    title: "Account Lockout",
    description: "User USR-4521 account locked due to excessive failed attempts",
    location: "Boston, US",
    timestamp: "2024-03-04 10:15:33",
  },
  {
    id: "ALR-9379",
    type: "device",
    severity: "low",
    title: "New Passkey Registration",
    description: "User USR-8492 registered a new passkey from iOS device",
    location: "New York, US",
    timestamp: "2024-03-04 09:42:27",
  },
];

const getSeverityColor = (severity) => {
  switch (severity) {
    case "high":
      return "text-[#FF3B5C] bg-[#FF3B5C]/10 border-[#FF3B5C]/20";
    case "medium":
      return "text-[#FFB800] bg-[#FFB800]/10 border-[#FFB800]/20";
    case "low":
      return "text-[#00C2FF] bg-[#00C2FF]/10 border-[#00C2FF]/20";
    default:
      return "text-gray-400 bg-gray-400/10 border-gray-400/20";
  }
};

const getTypeIcon = (type) => {
  switch (type) {
    case "suspicious":
      return AlertTriangle;
    case "device":
      return Shield;
    default:
      return Shield;
  }
};

export function Alerts() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold neon-text">Security Alerts</h1>
        <p className="text-sm text-gray-400 mt-1">
          Real-time security alerts and suspicious activity monitoring
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-panel p-4 rounded-xl border border-[#00C2FF]/20">
          <p className="text-sm text-gray-400">Total Alerts (24h)</p>
          <p className="text-2xl font-bold neon-text mt-1">34</p>
        </div>
        <div className="glass-panel p-4 rounded-xl border border-[#00C2FF]/20">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-[#FF3B5C] pulse-glow"></div>
            <p className="text-sm text-gray-400">High Severity</p>
          </div>
          <p className="text-2xl font-bold text-[#FF3B5C]">8</p>
        </div>
        <div className="glass-panel p-4 rounded-xl border border-[#00C2FF]/20">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-[#FFB800] pulse-glow"></div>
            <p className="text-sm text-gray-400">Medium Severity</p>
          </div>
          <p className="text-2xl font-bold text-[#FFB800]">15</p>
        </div>
        <div className="glass-panel p-4 rounded-xl border border-[#00C2FF]/20">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-[#00C2FF] pulse-glow"></div>
            <p className="text-sm text-gray-400">Low Severity</p>
          </div>
          <p className="text-2xl font-bold text-[#00C2FF]">11</p>
        </div>
      </div>

      {/* Alerts Feed */}
      <div className="space-y-4">
        {alertsData.map((alert) => {
          const Icon = getTypeIcon(alert.type);
          return (
            <div
              key={alert.id}
              className={`glass-panel p-6 rounded-xl border ${getSeverityColor(
                alert.severity
              )} stat-card`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center ${getSeverityColor(
                    alert.severity
                  )}`}
                >
                  <Icon size={24} />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold">{alert.title}</h3>
                      <p className="text-sm text-gray-400 mt-1">{alert.description}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${getSeverityColor(
                        alert.severity
                      )}`}
                    >
                      {alert.severity}
                    </span>
                  </div>

                  <div className="flex items-center gap-6 text-sm text-gray-400 mt-4">
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-[#00C2FF]" />
                      <span>{alert.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-[#00C2FF]" />
                      <span className="font-mono">{alert.timestamp}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-gray-500">{alert.id}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="px-4 py-2 rounded-lg border border-[#00C2FF]/20 hover:bg-[#00C2FF]/10 transition-colors text-sm">
                    View Details
                  </button>
                  <button className="px-4 py-2 rounded-lg border border-[#00FF88]/20 text-[#00FF88] hover:bg-[#00FF88]/10 transition-colors text-sm">
                    Resolve
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
