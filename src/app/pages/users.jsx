import { useState, useEffect } from "react";
import { Search, Filter, Eye, Lock, Unlock, CheckCircle2, XCircle } from "lucide-react";
import { useNavigate } from "react-router";
import { usersService } from "../../services/users";

export function Users() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);


  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Fetch users when filters or pagination changes
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const params = {
          limit,
          offset: (page - 1) * limit,
        };

        if (searchTerm) params.search = searchTerm;
        if (filterStatus !== "all") params.status = filterStatus;
        if (fromDate) params.lastLoginFrom = new Date(fromDate).toISOString();
        if (toDate) {
          const endDate = new Date(toDate);
          endDate.setHours(23, 59, 59, 999);
          params.lastLoginTo = endDate.toISOString();
        }

        const response = await usersService.getUsers(params);
        if (response) {
          setUsers(response.data || []);
          setTotal(response.total || 0);
        }
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        setLoading(false);
      }
    };

    // Quick debounce for search term
    const timeoutId = setTimeout(() => {
      fetchUsers();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, filterStatus, fromDate, toDate, page, limit]);

  const handleToggleLock = async (user) => {
    // If active, we block it (locked: true). If inactive, we restore (locked: false).
    const willLock = user.status === "active";

    // Optimistic UI update
    setUsers(prev => prev.map(u =>
      u.userId === user.userId
        ? { ...u, status: willLock ? "inactive" : "active" }
        : u
    ));
    if (selectedUser && selectedUser.userId === user.userId) {
      setSelectedUser({ ...selectedUser, status: willLock ? "inactive" : "active" });
    }

    try {
      if (window.confirm(`Are you sure you want to ${willLock ? "lock" : "unlock"} this user?`)) {
        await usersService.updateLockStatus(user.userId, willLock);
      } else {
        // Revert on cancel
        setUsers(prev => prev.map(u =>
          u.userId === user.userId
            ? { ...u, status: user.status }
            : u
        ));
        if (selectedUser && selectedUser.userId === user.userId) setSelectedUser({ ...selectedUser, status: user.status });
      }
    } catch (error) {
      console.error("Failed to update user lock status", error);
      // Revert on error
      setUsers(prev => prev.map(u =>
        u.userId === user.userId
          ? { ...u, status: user.status }
          : u
      ));
      if (selectedUser && selectedUser.userId === user.userId) setSelectedUser({ ...selectedUser, status: user.status });
      alert("Failed to update user lock status.");
    }
  };

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
              {loading ? (
                <tr>
                  <td colSpan="8" className="py-8 text-center text-gray-400">Loading users...</td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-8 text-center text-gray-400">No users found.</td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.userId} className="table-row">
                    <td className="py-4 px-4 text-sm font-mono">{user.userId}</td>
                    <td className="py-4 px-4 text-sm font-medium">{user.name}</td>
                    <td className="py-4 px-4 text-sm text-gray-400">{user.email || "-"}</td>
                    <td className="py-4 px-4 text-sm text-gray-400">{user.phone || "-"}</td>
                    <td className="py-4 px-4 text-sm">
                      {user.mfaEnabled ? (
                        <CheckCircle2 size={18} className="text-[#00FF88]" />
                      ) : (
                        <XCircle size={18} className="text-gray-500" />
                      )}
                    </td>

                    <td className="py-4 px-4 text-sm text-gray-400 font-mono">
                      {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "Never"}
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
                          onClick={() => handleToggleLock(user)}
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
            Showing {(page - 1) * limit + 1} to {Math.min(page * limit, total)} of {total} users
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
                  <p className="font-mono text-[#00C2FF]">{selectedUser.userId}</p>
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
                  <p className="text-sm">{selectedUser.email || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Phone</p>
                  <p>{selectedUser.phone || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Last Login</p>
                  <p className="text-sm font-mono">{selectedUser.lastLogin ? new Date(selectedUser.lastLogin).toLocaleString() : "Never"}</p>
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
                <button
                  onClick={() => handleToggleLock(selectedUser)}
                  className="px-4 py-2 rounded-lg border border-[#FFB800] text-[#FFB800] hover:bg-[#FFB800]/10 transition-colors"
                >
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
