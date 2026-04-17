export const PATHS = {
  dashboard: "/admin",
  users: "/admin/users",
  content: "/admin/content",
  bookings: "/admin/bookings",
  commerce: "/admin/commerce",
  analytics: "/admin/analytics",
  settings: "/admin/settings",
  
};

export const NAV_ITEMS = [
  { to: PATHS.dashboard, label: "Dashboard", icon: "LayoutDashboard" },
  { to: PATHS.users, label: "Users", icon: "Users" },
  { to: PATHS.content, label: "Content", icon: "Image" },
  { to: PATHS.bookings, label: "Bookings", icon: "UtensilsCrossed" },
  { to: PATHS.commerce, label: "Commerce", icon: "Mail" },
  { to: PATHS.analytics, label: "Analytics", icon: "Wallet" },
  { to: PATHS.settings, label: "Settings", icon: "MessageSquare" },
  // { to: PATHS.notifications, label: "Notifications", icon: "Bell" },
  
];
