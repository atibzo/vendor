// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "./index.css";

// Admin layout & pages
import AdminLayout from "./pages/AdminLayout";
import TripBatches from "./pages/TripBatches";
import TripVendors from "./pages/TripVendors";
import BatchDetail from "./pages/BatchDetail";

// Vendors section
import VendorsDirectory from "./pages/VendorsDirectory";
import VendorsOnboarding from "./pages/VendorsOnboarding";
import VendorProfile from "./pages/VendorProfile";

// Public (no tokens)
import PublicVendorView from "./pages/PublicVendorView";
import PublicWelcomePack from "./pages/PublicWelcomePack";

// Placeholders (must exist)
import TripItineraries from "./pages/TripItineraries";
import TripInfo from "./pages/TripInfo";

const router = createBrowserRouter([
  // Default landings so "/" and "/admin" render something
  { path: "/", element: <Navigate to="/admin/trips/t1/batches" replace /> },
  { path: "/admin", element: <Navigate to="/admin/trips/t1/batches" replace /> },

  // Trip-scoped admin pages
  {
    path: "/admin/trips/:tripId",
    element: <AdminLayout />,
    children: [
      { path: "info", element: <TripInfo /> },
      { path: "itineraries", element: <TripItineraries /> },
      { path: "batches", element: <TripBatches /> },
      { path: "batches/:batchId", element: <BatchDetail /> },
      { path: "vendors", element: <TripVendors /> },
    ],
  },

  // Vendors (left-nav section)
  {
    path: "/admin/vendors",
    element: <AdminLayout activeLeftNav="vendors" />,
    children: [
      { index: true, element: <VendorsDirectory /> },
      { path: "onboarding", element: <VendorsOnboarding /> },
      { path: ":vendorId", element: <VendorProfile /> },
    ],
  },

  // Public views (no tokens)
  { path: "/public/vendor/:tripId/:batchId", element: <PublicVendorView /> },
  { path: "/public/welcome/:tripId/:batchId", element: <PublicWelcomePack /> },

  // IMPORTANT: catch-all -> redirect to Batches (avoid a blank AdminLayout)
  { path: "*", element: <Navigate to="/admin/trips/t1/batches" replace /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
