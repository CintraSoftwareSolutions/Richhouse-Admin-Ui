import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import Login from "../pages/Login";

//module imports
import UsersList from "../modules/users/UsersList.jsx";
import AnalyticsList from "../modules/analytics/AnalyticsList.jsx";
// import PaymentsList from "../modules/payments/PaymentsList.jsx";
// import BookingsList from "../modules/feedbacks/BookingsList.jsx";
import ContentList from "../modules/content/ContentList.jsx";
import Dashboard from "../modules/dashboard/Dashboard.jsx";
import Settings from "../modules/settings/SettingsList.jsx";
import Commerence from "../modules/commerce/CommerceList";
import Booking from  "../modules/bookings/BookingsList.jsx"

const router = createBrowserRouter([
//   { path: "/login", element: <Login /> },

  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "users",
        element: <UsersList />,
      },
      {
        path: "Analytics",
        element: <AnalyticsList />,
      },
      {
        path: "Content",
        element: <ContentList />,
      },
     {
        path: "Commerence",
        element: <Commerence />,
      },
      {
        path: "Booking",
        element: <Booking />,
      },
      {
        path: "Settings",
        element: <Settings />,
      },
    ],
  },
  { path: "*", element: <Dashboard /> },
]);

export default router;
