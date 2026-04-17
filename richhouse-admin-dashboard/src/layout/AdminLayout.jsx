import React, { useEffect, useMemo, useState } from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom"; 
import Header from "./Header";
import Sidebar from "./Sidebar";

const FONT_URL =
  "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap";

export default function AdminLayout() {
  // Load Google Font for this layout
  useEffect(() => {
    // preconnects to speed up font fetch
    const p1 = document.createElement("link");
    p1.rel = "preconnect";
    p1.href = "https://fonts.googleapis.com";
    const p2 = document.createElement("link");
    p2.rel = "preconnect";
    p2.href = "https://fonts.gstatic.com";
    p2.crossOrigin = "anonymous";
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = FONT_URL;
    document.head.append(p1, p2, link);
    return () => {
      document.head.removeChild(link);
      document.head.removeChild(p2);
      document.head.removeChild(p1);
    };
  }, []);

  // Desktop collapse state (persisted)
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("admin:sidebar:collapsed")) ?? false;
    } catch {
      return false;
    }
  });
  useEffect(() => {
    localStorage.setItem("admin:sidebar:collapsed", JSON.stringify(collapsed));
  }, [collapsed]);


  // Mobile slide-in sidebar
  const [mobileOpen, setMobileOpen] = useState(false);

  const location = useLocation();
  const contentKey = useMemo(() => location.pathname, [location.pathname]);


  const isAuthenticated = !!localStorage.getItem("token"); 

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  



  return (
    <div
      className="min-h-screen bg-neutral-100 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100"
      style={{ fontFamily: '"Poppins", ui-sans-serif, system-ui' }}
    >
      <div className="md:flex md:min-h-screen">
        {/* Sidebar (mobile: overlay & slide-in, desktop: sticky column) */}
        {/* Backdrop for mobile */}
        {mobileOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px] md:hidden"
            onClick={() => setMobileOpen(false)}
            aria-hidden
          />
        )}

        <aside
          className={[
            // Base
            "z-50 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800",
            // Mobile overlay panel
            "fixed inset-y-0 left-0 w-72 transform transition-transform duration-200 md:transform-none md:static md:w-auto",
            mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
            // Desktop sizing + sticky
            "md:sticky md:top-0 md:h-[100dvh]",
            // Collapse width on md+
            collapsed ? "md:w-20" : "md:w-60",
            // Smooth width transition on md+
            "transition-[width] ease-in-out"
          ].join(" ")}
          aria-hidden={false}
        >
          <Sidebar
            collapsed={collapsed}
            onToggle={() => setCollapsed((v) => !v)}
            onNavigate={() => setMobileOpen(false)} // close on mobile nav
          />
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0 md:min-h-screen md:flex md:flex-col">
          <Header
            onToggleSidebar={() => setCollapsed((v) => !v)}  // desktop collapse
            onOpenSidebar={() => setMobileOpen(true)}         // mobile open
          />

          {/* Page content container (no extra card wrapper) */}
          <div
            key={contentKey}
            className="px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-6 w-full  mx-auto"
          >
            {/* Remove extra white box: child modules render their own cards/containers */}
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
