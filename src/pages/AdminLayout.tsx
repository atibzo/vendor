import { Link, NavLink, Outlet, useLocation, useParams } from 'react-router-dom'
import { DEMO_TRIPS } from '../utils/data'
import { Icon } from "../components/Icons"

export default function AdminLayout({ activeLeftNav }:{activeLeftNav?:'vendors'}){
  const { tripId } = useParams(); const trip = DEMO_TRIPS.find(t=>t.id===tripId) || DEMO_TRIPS[0]
  const loc = useLocation(); const inTrips = loc.pathname.startsWith('/admin/trips'); const inVendors = loc.pathname.startsWith('/admin/vendors')
  return (<div className='min-h-screen bg-[#0B0C0F] text-zinc-100'><div className='flex'>
<aside className="hidden md:block w-64 border-r border-zinc-900/80 p-4">
  {/* Brand / header */}
  <div className="mb-3">
    <a href="#" className="text-sm font-medium text-zinc-200 hover:underline">
      Zostel Admin
    </a>
  </div>

  {/* Quick Search */}
  <div className="flex items-center gap-2 text-zinc-400 text-sm mb-5">
    <Icon.Search className="text-zinc-400" />
    <div>
      <div>Quick Search</div>
      <div className="text-xs">⌘ + K</div>
    </div>
  </div>

  {/* Section label with caret */}
  <div className="flex items-center justify-between text-zinc-400 text-xs uppercase tracking-wide mb-2">
    <span>Zo Console</span>
    <span className="text-zinc-500">▾</span>
  </div>

  {/* Nav items */}
  <nav className="space-y-1 text-sm">
    <div className="px-2 py-2 rounded-lg text-zinc-300 hover:bg-zinc-900/60 cursor-default flex items-center gap-3">
      <Icon.Menu className="text-zinc-500" /> Home
    </div>
    <div className="px-2 py-2 rounded-lg text-zinc-300 hover:bg-zinc-900/60 cursor-default flex items-center gap-3">
      <Icon.Home className="text-zinc-500" /> Zo Houses
    </div>
    <div className="px-2 py-2 rounded-lg text-zinc-300 hover:bg-zinc-900/60 cursor-default flex items-center gap-3">
      <Icon.Bed className="text-zinc-500" /> Availability View
    </div>
    <div className="px-2 py-2 rounded-lg text-zinc-300 hover:bg-zinc-900/60 cursor-default flex items-center gap-3">
      <Icon.Users className="text-zinc-500" /> Visitors
    </div>
    <div className="px-2 py-2 rounded-lg text-zinc-300 hover:bg-zinc-900/60 cursor-default flex items-center gap-3">
      <Icon.Calendar className="text-zinc-500" /> Bookings
    </div>
    <div className="px-2 py-2 rounded-lg text-zinc-300 hover:bg-zinc-900/60 cursor-default flex items-center gap-3">
      <Icon.Store className="text-zinc-500" /> Showcase
    </div>

    {/* Trip (active state in lime) */}
    <NavLink
      to={`/admin/trips/${trip.id}/batches`}
      className={({ isActive }) =>
        `px-2 py-2 rounded-lg flex items-center gap-3 ${
          isActive ? "text-lime-300" : "text-zinc-300 hover:bg-zinc-900/60"
        }`
      }
    >
      <Icon.Plane className={/* icon matches text color */ ""} />
      Trip
    </NavLink>

    {/* Vendors (keep as label, no icon change requested) */}
    <NavLink
  to={`/admin/vendors`}
  className={({ isActive }) =>
    `px-2 py-2 rounded-lg flex items-center gap-3 ${
      isActive ? "text-lime-300" : "text-zinc-300 hover:bg-zinc-900/60"
    }`
  }
>
  <Icon.Vendor />
  Vendors
</NavLink>

    <div className="px-2 py-2 rounded-lg text-zinc-300 hover:bg-zinc-900/60 cursor-default flex items-center gap-3">
      <Icon.Ticket className="text-zinc-500" /> Trip Booking
    </div>
  </nav>
</aside>    

    <main className='flex-1'>
      {inTrips && (<header className='px-6 py-4 border-b border-zinc-900/80 flex items-center justify-between'>
        <div><div className='text-sm text-zinc-400'>Trips / {trip.name}</div><h1 className='text-xl font-semibold'>{trip.name}</h1>
          <div className='mt-3 flex gap-6 text-sm'>
            <NavLink to={`/admin/trips/${trip.id}/info`} className={({isActive})=>isActive?'text-lime-300 border-b border-lime-400/50 pb-1':'text-zinc-300'}>Trip Info</NavLink>
            <NavLink to={`/admin/trips/${trip.id}/itineraries`} className={({isActive})=>isActive?'text-lime-300 border-b border-lime-400/50 pb-1':'text-zinc-300'}>Itinerary Tabs</NavLink>
            <NavLink to={`/admin/trips/${trip.id}/batches`} className={({isActive})=>isActive?'text-lime-300 border-b border-lime-400/50 pb-1':'text-zinc-300'}>Batches</NavLink>
            <span className='text-zinc-300'>Cancellation Policy</span><span className='text-zinc-300'>Add-Ons</span><span className='text-zinc-300'>Coupons</span>
            <NavLink to={`/admin/trips/${trip.id}/vendors`} className={({isActive})=>isActive?'text-lime-300 border-b border-lime-400/50 pb-1':'text-zinc-300'}>Vendors</NavLink>
          </div></div><button className='rounded-xl bg-lime-400 text-zinc-900 font-semibold px-3 py-2 hover:bg-lime-300'>Preview Trip</button></header>)}
      {inVendors && (<header className='px-6 py-4 border-b border-zinc-900/80 flex items-center justify-between'><h1 className='text-xl font-semibold'>Vendors</h1><div className='flex gap-2'><Link to='/admin/vendors' className={`px-3 py-2 rounded-xl border border-zinc-700 ${loc.pathname==='/admin/vendors'?'text-lime-300 border-lime-400/50':''}`}>Directory</Link><Link to='/admin/vendors/onboarding' className={`px-3 py-2 rounded-xl border border-zinc-700 ${loc.pathname.includes('/onboarding')?'text-lime-300 border-lime-400/50':''}`}>Onboarding</Link></div></header>)}
      <div className='px-6 py-6 max-w-7xl mx-auto'><Outlet /></div></main></div></div>)
}
