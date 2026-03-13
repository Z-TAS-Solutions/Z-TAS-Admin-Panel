import { Outlet, Link, useLocation } from "react-router";
import {
  LayoutDashboard,
  Key,
  Bell,
  Search,
  ChevronDown,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/passkeys", label: "Passkeys", icon: Key },
];

export function AdminLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen">
      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 h-16 glass-panel border-b border-[#00C2FF]/20 z-50">
        <div className="h-full flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-[#00C2FF]/10 rounded-lg transition-colors"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg overflow-hidden">
                <img
                  src="/z_taslogo.png"
                  alt="ZTAS Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-lg font-semibold neon-text">ZTAS Admin Console</h1>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-2 h-2 rounded-full bg-[#00FF88] pulse-glow"></div>
                  <span className="status-active">SCANNING ACTIVE</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="hidden md:flex items-center gap-2 glass-panel px-4 py-2 rounded-lg border border-[#00C2FF]/20">
              <Search size={16} className="text-[#00C2FF]" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none outline-none w-48 text-sm"
              />
            </div>

            {/* Notification Bell */}
            <button className="relative p-2 hover:bg-[#00C2FF]/10 rounded-lg transition-colors">
              <Bell size={20} className="text-[#00C2FF]" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#FF3B5C] rounded-full"></span>
            </button>

            {/* Admin Profile */}
            <button className="flex items-center gap-2 glass-panel px-3 py-2 rounded-lg border border-[#00C2FF]/20 hover:bg-[#00C2FF]/10 transition-colors">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00C2FF] to-[#1E90FF] flex items-center justify-center text-xs font-semibold">
                SA
              </div>
              <span className="hidden md:inline text-sm">Super Admin</span>
              <ChevronDown size={16} />
            </button>
          </div>
        </div>
        <div className="scanning-line"></div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 bottom-0 w-64 sidebar-nav z-40 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <nav className="p-4 space-y-1 overflow-y-auto h-full">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              location.pathname === item.path ||
              (item.path !== "/" && location.pathname.startsWith(item.path));

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`sidebar-item flex items-center gap-3 px-4 py-3 rounded-lg ${
                  isActive ? "active" : ""
                }`}
              >
                <Icon size={18} />
                <span className="text-sm">{item.label}</span>
              </Link>
            );
          })}

          <button className="sidebar-item flex items-center gap-3 px-4 py-3 rounded-lg w-full text-left mt-4 border-t border-[#00C2FF]/20 pt-4">
            <LogOut size={18} />
            <span className="text-sm">Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main
        className={`pt-20 transition-all duration-300 ${
          sidebarOpen ? "lg:pl-64" : ""
        } pl-0`}
      >
        <div className="p-6">
          <Outlet />
        </div>
      </main>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}