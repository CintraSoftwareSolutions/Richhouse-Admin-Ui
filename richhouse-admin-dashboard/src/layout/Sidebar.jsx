import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { NAV_ITEMS } from "../constants/modules";
import * as Icons from "lucide-react";
import { ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import useAdminLogin from "../hooks/auth/useLogin";
// import { signOut } from "../auth/auth.store";

function Item({ to, label, Icon, collapsed, onNavigate }) {
  return (
    <NavLink
      to={to}
      end
      onClick={onNavigate}
      className={({ isActive }) =>
        `group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition
        ${
          isActive
            ? "bg-white text-[#27616d] shadow-[0_10px_20px_rgba(255,255,255,0.12)]"
            : "text-white/80 hover:bg-white/10 hover:text-white"
        }`
      }
      title={collapsed ? label : undefined}
    >
      <Icon className="w-5 h-5 shrink-0" />
      {!collapsed && <span className="truncate">{label}</span>}
    </NavLink>
  );
}

function Brand({ collapsed }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/14 text-lg font-semibold text-white shadow-inner shadow-white/10">
        F
      </div>
      {!collapsed && (
        <div className="leading-tight">
          <div className="px-1 text-xl font-semibold tracking-tight text-white">
            Flexio
          </div>
          <div className="px-1 text-xs text-white/60">Studio admin</div>
        </div>
      )}
    </div>
  );
}

export default function Sidebar({ collapsed, onToggle, onNavigate }) {
  const navigate = useNavigate();
  const { logoutAdmin } = useAdminLogin(); 
  

const handleLogout = async () => {
  try {
    await logoutAdmin(); 
  } catch (err) {
    console.log("Logout failed:", err.message);
  } finally {
    onNavigate?.();
    navigate("/login", { replace: true });
  }
};

  return (
    <div className="h-full flex flex-col">
      {/* Brand */}
      <div className="flex h-20 items-center gap-3 border-b border-white/10 px-4">
        <Brand collapsed={collapsed} />
        {/* Collapse button (desktop) */}
        <button
          onClick={onToggle}
          className="ml-auto hidden md:inline-flex items-center justify-center rounded-xl border border-white/15 px-2 py-1 text-xs text-white/80 hover:bg-white/10"
          title={collapsed ? "Expand" : "Collapse"}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Nav */}
      <nav className="space-y-1 p-4">
        {NAV_ITEMS.map(({ to, label, icon }) => {
          const Icon = Icons[icon] ?? Icons.Circle;
          return (
            <Item
              key={to}
              to={to}
              label={label}
              Icon={Icon}
              collapsed={collapsed}
              onNavigate={onNavigate}
            />
          );
        })}
      </nav>

      {/* Footer */}
      <div className="mt-auto p-4">
        {collapsed ? (
          <button
            onClick={handleLogout}
            className="inline-flex w-full items-center justify-center rounded-2xl border border-white/15 px-2.5 py-2 text-xs text-white hover:bg-white/10"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={handleLogout}
              className="ml-auto inline-flex items-center gap-2 rounded-2xl border border-white/15 px-4 py-2.5 text-sm font-medium text-white hover:bg-white/10"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
