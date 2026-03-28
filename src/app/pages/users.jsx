import { useState } from "react";
import { Search, Filter, Eye, Lock, Unlock, CheckCircle2, XCircle } from "lucide-react";
<<<<<<< Updated upstream

const usersData = [
  {
    id: "USR-8492",
    name: "Sarah Mitchell",
    email: "sarah.mitchell@gmail.com",
    phone: "+94 771234567",
    mfaEnabled: true,
    passkeyStatus: "Active",
    lastLogin: "2024-03-04 14:23:11",
    status: "active",
  },
  {
    id: "USR-7341",
    name: "James Rodriguez",
    email: "james.r@gmail.com",
    phone: "+94 771234567",
    mfaEnabled: true,
    passkeyStatus: "Active",
    lastLogin: "2024-03-04 13:45:22",
    status: "active",
  },
  {
    id: "USR-6629",
    name: "Emily Chen",
    email: "emily.chen@gmail.com",
    phone: "+94 771234567",
    mfaEnabled: false,
    passkeyStatus: "Inactive",
    lastLogin: "2024-03-03 09:12:45",
    status: "active",
  },
  {
    id: "USR-9012",
    name: "Michael Brown",
    email: "m.brown@gmail.com",
    phone: "+94 771234567",
    mfaEnabled: true,
    passkeyStatus: "Active",
    lastLogin: "2024-03-04 11:30:18",
    status: "active",
  },
  {
    id: "USR-4521",
    name: "Jessica Taylor",
    email: "j.taylor@gmail.com",
    phone: "+94 771234567",
    mfaEnabled: true,
    passkeyStatus: "Inactive",
    lastLogin: "2024-03-02 16:55:33",
    status: "inactive",
  },
  {
    id: "USR-3318",
    name: "David Kim",
    email: "david.kim@gmail.com",
    phone: "+94 771234567",
    mfaEnabled: false,
    passkeyStatus: "Inactive",
    lastLogin: "2024-03-04 08:20:11",
    status: "active",
  },
  {
    id: "USR-2207",
    name: "Amanda White",
    email: "a.white@gmail.com",
    phone: "+94 771234567",
    mfaEnabled: true,
    passkeyStatus: "Active",
    lastLogin: "2024-03-04 10:45:29",
    status: "active",
  },
  {
    id: "USR-1156",
    name: "Robert Garcia",
    email: "robert.g@gmail.com",
    phone: "+94 771234567",
    mfaEnabled: true,
    passkeyStatus: "Active",
    lastLogin: "2024-03-01 14:15:42",
    status: "active",
  },
];

export function Users() {
=======
import { useNavigate } from "react-router";
import { usersService } from "../../services/users";

export function Users() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

>>>>>>> Stashed changes
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredUsers = usersData.filter(
    (user) => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = filterStatus === "all" || user.status === filterStatus;

      let matchesDate = true;
      if (fromDate || toDate) {
        const userDate = new Date(user.lastLogin);
        if (fromDate && new Date(fromDate) > userDate) matchesDate = false;
        if (toDate) {
          const toDateObj = new Date(toDate);
          toDateObj.setHours(23, 59, 59, 999);
          if (toDateObj < userDate) matchesDate = false;
        }
      }
      return matchesSearch && matchesStatus && matchesDate;
    }
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold neon-text">User Management</h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage user accounts, MFA settings, and access control
          </p>
        </div>
        <button 
          onClick={() => navigate('/dashboard/user-enrollment')}
          className="gradient-button px-6 py-2 rounded-lg text-white font-semibold"
        >
          Add New User
        </button>
      </div>

      {/* Search and Filters */}
      <div className="glass-panel p-4 rounded-xl border border-[#00C2FF]/20 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 flex items-center gap-2 glass-panel px-4 py-2 rounded-lg border border-[#00C2FF]/20">
            <Search size={18} className="text-[#00C2FF]" />
            <input
              type="text"
              placeholder="Search by name, email, or user ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent border-none outline-none flex-1"
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
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-transparent border border-[#00C2FF]/20 rounded-lg px-3 py-1.5 text-sm outline-none text-[#00C2FF]"
              >
                <option value="all" className="bg-[#0A0F1C]">All</option>
                <option value="active" className="bg-[#0A0F1C]">Active</option>
                <option value="inactive" className="bg-[#0A0F1C]">Inactive</option>
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

      {/* Users Table */}
      <div className="glass-panel rounded-xl border border-[#00C2FF]/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#00C2FF]/20 bg-[#00C2FF]/5">
                <th className="text-left py-4 px-4 text-sm font-semibold text-[#00C2FF]">
                  User ID
                </th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-[#00C2FF]">
                  Name
                </th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-[#00C2FF]">
                  Email
                </th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-[#00C2FF]">
                  Phone
                </th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-[#00C2FF]">
                  MFA
                </th>

                <th className="text-left py-4 px-4 text-sm font-semibold text-[#00C2FF]">
                  Last Login
                </th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-[#00C2FF]">
                  Status
                </th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-[#00C2FF]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="table-row">
                  <td className="py-4 px-4 text-sm font-mono">{user.id}</td>
                  <td className="py-4 px-4 text-sm font-medium">{user.name}</td>
                  <td className="py-4 px-4 text-sm text-gray-400">{user.email}</td>
                  <td className="py-4 px-4 text-sm text-gray-400">{user.phone}</td>
                  <td className="py-4 px-4 text-sm">
                    {user.mfaEnabled ? (
                      <CheckCircle2 size={18} className="text-[#00FF88]" />
                    ) : (
                      <XCircle size={18} className="text-gray-500" />
                    )}
                  </td>

                  <td className="py-4 px-4 text-sm text-gray-400 font-mono">
                    {user.lastLogin}
                  </td>
                  <td className="py-4 px-4 text-sm">
                    <span
                      className={`px-2 py-1 rounded text-xs ${user.status === "active"
                          ? "bg-[#00FF88]/10 text-[#00FF88]"
                          : "bg-[#FF3B5C]/10 text-[#FF3B5C]"
                        }`}
                    >
                      {user.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="p-2 hover:bg-[#00C2FF]/10 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye size={16} className="text-[#00C2FF]" />
                      </button>
                      <button
                        className="p-2 hover:bg-[#00C2FF]/10 rounded-lg transition-colors"
                        title={user.status === "active" ? "Deactivate Account" : "Activate Account"}
                      >
                        {user.status === "active" ? (
                          <Lock size={16} className="text-[#FFB800]" />
                        ) : (
                          <Unlock size={16} className="text-[#00FF88]" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Detail Modal */}
      {selectedUser && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedUser(null)}
        >
          <div
            className="glass-panel border border-[#00C2FF]/20 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold neon-text mb-6">User Profile</h2>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">User ID</p>
                  <p className="font-mono text-[#00C2FF]">{selectedUser.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Status</p>
                  <p className={selectedUser.status === "active" ? "text-[#00FF88]" : "text-[#FF3B5C]"}>
                    {selectedUser.status === "active" ? "Active" : "Inactive"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Name</p>
                  <p>{selectedUser.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="text-sm">{selectedUser.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Phone</p>
                  <p>{selectedUser.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Last Login</p>
                  <p className="text-sm font-mono">{selectedUser.lastLogin}</p>
                </div>
              </div>

              <div className="border-t border-[#00C2FF]/20 pt-4">
                <h3 className="font-semibold mb-3 text-[#00C2FF]">Security Settings</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">MFA Enabled</span>
                    <span className={selectedUser.mfaEnabled ? "text-[#00FF88]" : "text-gray-500"}>
                      {selectedUser.mfaEnabled ? "Yes" : "No"}
                    </span>
                  </div>

                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  className="flex-1 gradient-button px-4 py-2 rounded-lg"
                  onClick={() => setSelectedUser(null)}
                >
                  Close
                </button>
                <button className="px-4 py-2 rounded-lg border border-[#FFB800] text-[#FFB800] hover:bg-[#FFB800]/10 transition-colors">
                  {selectedUser.status === "active" ? "Deactivate Account" : "Activate Account"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
