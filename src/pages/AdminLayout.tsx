import { Link, NavLink, Outlet, useLocation, useParams } from 'react-router-dom'
import { DEMO_TRIPS } from '../utils/data'

export default function AdminLayout({ activeLeftNav }:{activeLeftNav?:'vendors'}){
  const { tripId } = useParams();
  const trip = DEMO_TRIPS.find(t=>t.id===tripId) || DEMO_TRIPS[0];
  const loc = useLocation();
  const inTrips = loc.pathname.startsWith('/admin/trips');
  const inVendors = loc.pathname.startsWith('/admin/vendors');
  return (
    <div className='min-h-screen bg-[#0B0C0F] text-zinc-100'>
      <div className='flex'>
        <aside className='hidden md:block w-64 border-r border-zinc-900/80 p-4'>
          <div className='text-zinc-400 text-xs uppercase tracking-wide mb-3'>Zo Console</div>
          <nav className='space-y-1 text-sm'>
            <div className='px-2 py-1 rounded-lg text-zinc-300'>Home</div>
            <div className='px-2 py-1 rounded-lg text-zinc-300'>Zo Houses</div>
            <div className='px-2 py-1 rounded-lg text-zinc-300'>Availability View</div>
            <div className='px-2 py-1 rounded-lg text-zinc-300'>Visitors</div>
            <div className='px-2 py-1 rounded-lg text-zinc-300'>Bookings</div>
            <div className='px-2 py-1 rounded-lg text-zinc-300'>Showcase</div>
            <NavLink to={`/admin/trips/${trip.id}/batches`} className={({isActive})=>`px-2 py-1 rounded-lg ${isActive?'text-lime-300':'text-zinc-300'}`}>Trip</NavLink>
            <NavLink to={`/admin/vendors`} className={({isActive})=>`px-2 py-1 rounded-lg ${isActive||activeLeftNav==='vendors'?'text-lime-300':'text-zinc-300'}`}>Vendors</NavLink>
          </nav>
        </aside>
        <main className='flex-1'>
          {inTrips && (
            <header className='px-6 py-4 border-b border-zinc-900/80 flex items-center justify-between'>
              <div>
                <div className='text-sm text-zinc-400'>Trips / {trip.name}</div>
                <h1 className='text-xl font-semibold'>{trip.name}</h1>
                <div className='mt-3 flex gap-4 text-sm'>
                  <NavLink to={`/admin/trips/${trip.id}/info`} className={({isActive})=>isActive?'text-lime-300 border-b border-lime-400/50 pb-1':'text-zinc-300'}>Trip Info</NavLink>
                  <NavLink to={`/admin/trips/${trip.id}/itineraries`} className={({isActive})=>isActive?'text-lime-300 border-b border-lime-400/50 pb-1':'text-zinc-300'}>Itineraries</NavLink>
                  <NavLink to={`/admin/trips/${trip.id}/batches`} className={({isActive})=>isActive?'text-lime-300 border-b border-lime-400/50 pb-1':'text-zinc-300'}>Batches</NavLink>
                  <span className='text-zinc-300'>Cancellation Policy</span>
                  <span className='text-zinc-300'>Add-Ons</span>
                  <span className='text-zinc-300'>Coupons</span>
                  <NavLink to={`/admin/trips/${trip.id}/vendors`} className={({isActive})=>isActive?'text-lime-300 border-b border-lime-400/50 pb-1':'text-zinc-300'}>Vendors</NavLink>
                </div>
              </div>
              <button className='rounded-xl bg-lime-400 text-zinc-900 font-semibold px-3 py-2 hover:bg-lime-300'>Preview Trip</button>
            </header>
          )}
          {inVendors && (
            <header className='px-6 py-4 border-b border-zinc-900/80 flex items-center justify-between'>
              <h1 className='text-xl font-semibold'>Vendors</h1>
              <div className='flex gap-2'>
                <Link to='/admin/vendors' className={`px-3 py-2 rounded-xl border border-zinc-700 ${loc.pathname==='/admin/vendors'?'text-lime-300 border-lime-400/50':''}`}>Directory</Link>
                <Link to='/admin/vendors/onboarding' className={`px-3 py-2 rounded-xl border border-zinc-700 ${loc.pathname.includes('/onboarding')?'text-lime-300 border-lime-400/50':''}`}>Onboarding</Link>
              </div>
            </header>
          )}
          <div className='px-6 py-6 max-w-7xl mx-auto'>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
