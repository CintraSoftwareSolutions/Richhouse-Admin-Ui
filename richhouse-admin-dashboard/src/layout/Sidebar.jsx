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
        `group flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition
        ${
          isActive
            ? "bg-neutral-900 text-white dark:bg-neutral-700"
            : "text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
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
      {/* Single logo asset; invert in dark for contrast */}
      {/* <img
        src="/public/assets/images/Applogo.png"
        alt="Crave"
        className="h-8 w-8 object-contain rounded dark:invert select-none"
        draggable="false"
      /> */}
      {!collapsed && (
        <div className="leading-tight">
          <div className="font-semibold px-3">Crave</div>
          {/* <div className="text-[11px] text-neutral-500 dark:text-neutral-400">v0.1</div> */}
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
      <div className="h-16 border-b border-neutral-200 dark:border-neutral-800 flex items-center gap-3 px-3">
        <Brand collapsed={collapsed} />
        {/* Collapse button (desktop) */}
        <button
          onClick={onToggle}
          className="ml-auto hidden md:inline-flex items-center justify-center text-xs px-2 py-1 rounded-lg border hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800"
          title={collapsed ? "Expand" : "Collapse"}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Nav */}
      <nav className="p-3 space-y-1">
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
      <div className="mt-auto p-3">
        {collapsed ? (
          <button
            onClick={handleLogout}
            className="w-full inline-flex items-center justify-center rounded-xl border px-2.5 py-1.5 text-xs bg-white hover:bg-neutral-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:border-neutral-700"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={handleLogout}
              className="ml-auto inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm bg-white hover:bg-neutral-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:border-neutral-700"
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
