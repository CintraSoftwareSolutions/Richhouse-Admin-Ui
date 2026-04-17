import React from "react";
import { useMatches, useNavigate } from "react-router-dom";
import { Bell, Sun, Moon, Menu, Search } from "lucide-react";
import useTheme from "../hooks/useTheme";

export default function Header({ onToggleSidebar, onOpenSidebar }) {
  const matches = useMatches();
  const navigate = useNavigate();
  const current = matches[matches.length - 1];
  const pathTitle = current?.pathname
    ?.split("/")
    .filter(Boolean)
    .pop()
    ?.replace(/[-_]/g, " ");
  const title =
    current?.handle?.title ??
    (pathTitle
      ? pathTitle.charAt(0).toUpperCase() + pathTitle.slice(1)
      : "Dashboard");
  const { theme, toggle } = useTheme();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/88 backdrop-blur">
      <div className="mx-auto flex h-20 items-center justify-between gap-4 px-4 md:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            onClick={() =>
              onOpenSidebar ? onOpenSidebar() : onToggleSidebar?.()
            }
            className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 md:hidden"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin")}
            className="inline-flex items-center"
            aria-label="Go to dashboard"
            title="Crave"
          >
          </button>
          <div>
            <p className="text-xl font-semibold tracking-tight text-slate-800 md:text-2xl">
              {title}
            </p>
            <p className="text-xs text-slate-400">Admin workspace overview</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <label className="hidden items-center gap-2 rounded-full bg-slate-50 px-4 py-2 text-slate-400 lg:flex">
            <Search className="h-4 w-4" />
            <input
              type="text"
              placeholder="Search"
              className="w-48 bg-transparent text-sm text-slate-600 outline-none placeholder:text-slate-400"
            />
          </label>
          <button
            type="button"
            onClick={() => navigate("/admin/notifications")}
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
            aria-label="Open notifications"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
          </button>
          <button
            onClick={toggle}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
            aria-label="Toggle theme"
            title={theme === "dark" ? "Switch to light" : "Switch to dark"}
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
          <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white pl-2 pr-3 py-1.5 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,#8fc6cf,#397986)] text-sm font-semibold text-white">
              A
            </div>
            <div className="hidden text-left sm:block">
              <p className="text-sm font-semibold text-slate-700">Admin</p>
              <p className="text-xs text-slate-400">Owner</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
