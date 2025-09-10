import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import AdminLayout from './pages/AdminLayout'
import TripBatches from './pages/TripBatches'
import TripVendors from './pages/TripVendors'
import BatchDetail from './pages/BatchDetail'
import VendorsDirectory from './pages/VendorsDirectory'
import VendorsOnboarding from './pages/VendorsOnboarding'
import VendorProfile from './pages/VendorProfile'
import PublicVendorView from './pages/PublicVendorView'
import PublicWelcomePack from './pages/PublicWelcomePack'
import TripItineraries from './pages/TripItineraries'
import TripInfo from './pages/TripInfo'

const router = createBrowserRouter([
  { path: '/admin/trips/:tripId', element: <AdminLayout />, children: [
    { path: 'info', element: <TripInfo /> },
    { path: 'itineraries', element: <TripItineraries /> },
    { path: 'batches', element: <TripBatches /> },
    { path: 'batches/:batchId', element: <BatchDetail /> },
    { path: 'vendors', element: <TripVendors /> },
  ]},
  { path: '/admin/vendors', element: <AdminLayout activeLeftNav='vendors' />, children: [
    { index: true, element: <VendorsDirectory /> },
    { path: 'onboarding', element: <VendorsOnboarding /> },
    { path: ':vendorId', element: <VendorProfile /> },
  ]},
  // Public (no tokens)
  { path: '/public/vendor/:tripId/:batchId', element: <PublicVendorView /> },
  { path: '/public/welcome/:tripId/:batchId', element: <PublicWelcomePack /> },
  { path: '*', element: <AdminLayout /> },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><RouterProvider router={router} /></React.StrictMode>
)
