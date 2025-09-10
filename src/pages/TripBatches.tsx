import { Link, useParams } from 'react-router-dom'
import { DEMO_BATCHES, DEMO_ITINERARIES, DEMO_TRIPS, DEMO_VENDORS } from '../utils/data'
import { useState } from 'react'
import HandoverDrawer from '../components/HandoverDrawer'

export default function TripBatches(){
  const { tripId } = useParams(); const batches = DEMO_BATCHES.filter(b=>b.tripId===tripId); const its = DEMO_ITINERARIES
  const [drawerOpen, setDrawerOpen] = useState(false); const [drawerCtx, setDrawerCtx] = useState<any>(null); const trip = DEMO_TRIPS.find(t=>t.id===tripId)
  function openHandover(b){ const phones=['+91 9xxxxxxxx1','+91 9xxxxxxxx2','+91 9xxxxxxxx3']; setDrawerCtx({ destination: trip?.name.split('(')[0].trim()||trip?.name||'', groupName: b.name, start: b.start, phones, vendorViewUrl:`/public/vendor/${b.tripId}/${b.id}`, welcomeUrl:`/public/welcome/${b.tripId}/${b.id}` }); setDrawerOpen(true) }
  function vendorName(b){ const va=b.vendorAssignments[0]; if(!va) return '— none —'; const v=DEMO_VENDORS.find(v=>v.id===va.vendorId); return v?.name||'— none —' }
  return (<>
    <div className='mb-3 text-sm text-zinc-400'>Batches</div>
    <div className='rounded-2xl border border-zinc-800 overflow-hidden'><table className='w-full text-sm'>
      <thead className='bg-zinc-900/60 text-zinc-400 uppercase'><tr><th className='px-4 py-3 text-left'>#</th><th className='px-4 py-3 text-left'>Name</th><th className='px-4 py-3 text-left'>Status</th><th className='px-4 py-3 text-left'>Itinerary</th><th className='px-4 py-3 text-left'>Vendor (Primary)</th><th className='px-4 py-3 text-right'>Actions</th></tr></thead>
      <tbody className='divide-y divide-zinc-800'>{batches.map((b,i)=>{ const it=its.find(x=>x.id===b.itineraryId); return (<tr key={b.id} className='hover:bg-zinc-900/40 align-top'>
        <td className='px-4 py-3 text-zinc-400'>{i+1}</td>
        <td className='px-4 py-3 font-medium'><Link to={`./${b.id}`} className='hover:underline'>{b.name}</Link></td>
        <td className='px-4 py-3'><span className='inline-flex rounded-md border border-zinc-700 bg-zinc-800/40 px-2 py-0.5 text-xs'>{b.status}</span></td>
        <td className='px-4 py-3'>{it?.name}</td>
        <td className='px-4 py-3'>{vendorName(b)}</td>
        <td className='px-4 py-2 text-right'><div className='space-x-2'>
          <Link to={`../vendors?batch=${b.id}`} className='rounded-xl border border-zinc-700 px-3 py-2 inline-block'>Assign Vendor</Link>
          <a href={`/public/vendor/${b.tripId}/${b.id}`} target='_blank' className='rounded-xl border border-zinc-700 px-3 py-2 inline-block'>View Vendor View</a>
          <button className='rounded-xl border border-zinc-700 px-3 py-2' onClick={()=>openHandover(b)}>Handover WA</button>
          <a href={`/public/welcome/${b.tripId}/${b.id}`} target='_blank' className='rounded-xl border border-zinc-700 px-3 py-2 inline-block'>Welcome Pack</a>
        </div><div className='text-right mt-1'><Link to={`./${b.id}`} className='text-zinc-400 text-xs hover:underline'>Guests</Link></div></td></tr>)})}</tbody>
    </table></div>
    {drawerOpen && drawerCtx && <HandoverDrawer ctx={drawerCtx} onClose={()=>setDrawerOpen(false)} />}
  </>)
}
