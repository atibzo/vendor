import { useParams } from 'react-router-dom'
import { DEMO_BATCHES, DEMO_GUESTS, DEMO_TRIPS } from '../utils/data'

export default function PublicVendorView(){
  const { tripId, batchId } = useParams();
  const b = DEMO_BATCHES.find(x=>x.id===batchId && x.tripId===tripId);
  const trip = DEMO_TRIPS.find(t=>t.id===tripId);
  if(!b || !trip) return <div className='min-h-screen flex items-center justify-center text-zinc-300 bg-white'>Invalid link.</div>;
  const guests = DEMO_GUESTS;
  return (
    <div className='min-h-screen bg-white text-zinc-900'>
      <div className='mx-auto max-w-4xl p-6'>
        <div className='text-sm text-zinc-500'>Zo Trips — Vendor View</div>
        <h1 className='text-2xl font-semibold'>{trip.name} • {b.name}</h1>
        <div className='text-zinc-600'>{b.start} — {b.end}</div>

        <div className='mt-6 rounded-2xl border border-zinc-200 overflow-hidden'>
          <table className='w-full text-sm'>
            <thead className='bg-zinc-50 text-zinc-500 uppercase'>
              <tr>
                <th className='px-3 py-2 text-left'>Name</th>
                <th className='px-3 py-2 text-left'>Phone</th>
                <th className='px-3 py-2 text-left'>Gender</th>
                <th className='px-3 py-2 text-left'>Arrival</th>
                <th className='px-3 py-2 text-left'>Room</th>
                <th className='px-3 py-2 text-left'>Diet</th>
                <th className='px-3 py-2 text-left'>Medical</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-zinc-200'>
              {guests.map(g => (
                <tr key={g.id}>
                  <td className='px-3 py-2'>{g.name}</td>
                  <td className='px-3 py-2'>{g.phone}</td>
                  <td className='px-3 py-2'>{g.gender||''}</td>
                  <td className='px-3 py-2'>{g.arrivalTime||''}</td>
                  <td className='px-3 py-2'>{g.room||''}</td>
                  <td className='px-3 py-2'>{g.dietNotes||''}</td>
                  <td className='px-3 py-2'>{g.medicalNotes||''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className='mt-6 rounded-2xl border border-zinc-200 p-4'>
          <div className='text-zinc-500'>Transfer plan</div>
          <div>{b.transferPlan || '—'}</div>
        </div>

        <div className='mt-8 text-xs text-zinc-500'>This link is limited to this group.</div>
      </div>
    </div>
  )
}
