import React from "react";
import { useMatches, useNavigate } from "react-router-dom";
import { Bell, Sun, Moon, Menu } from "lucide-react";
import useTheme from "../hooks/useTheme";

export default function Header({ onToggleSidebar, onOpenSidebar }) {
  const matches = useMatches();
  const navigate = useNavigate();
  const current = matches[matches.length - 1];
  const title = current?.handle?.title ?? "Admin";
  const { theme, toggle } = useTheme();

  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-white/70 dark:bg-neutral-900/70 border-b border-neutral-200 dark:border-neutral-800">
      <div className="mx-auto px-4 md:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() =>
              onOpenSidebar ? onOpenSidebar() : onToggleSidebar?.()
            }
            className="md:hidden inline-flex items-center justify-center rounded-xl border px-3 py-2 text-sm bg-white hover:bg-neutral-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:border-neutral-700"
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
            {/* <img
              src="/public/assets/images/Applogo.png"
              alt="Crave logo"
              className="h-8 w-8 object-contain rounded"
            /> */}
          </button>
          <h1 className="text-xl md:text-2xl font-semibold">{title}</h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/admin/notifications")}
            className="relative inline-flex items-center justify-center rounded-xl border px-3 py-2 bg-white hover:bg-neutral-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:border-neutral-700"
            aria-label="Open notifications"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
          </button>
          <button
            onClick={toggle}
            className="inline-flex items-center justify-center rounded-xl border px-3 py-2 bg-white hover:bg-neutral-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:border-neutral-700"
            aria-label="Toggle theme"
            title={theme === "dark" ? "Switch to light" : "Switch to dark"}
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
          <div className="w-9 h-9 rounded-full bg-neutral-200 overflow-hidden" />
        </div>
      </div>
    </header>
  );
}
