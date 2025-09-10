import { useParams } from 'react-router-dom'
import { DEMO_BATCHES, DEMO_TRIPS } from '../utils/data'

export default function PublicWelcomePack(){
  const { tripId, batchId } = useParams();
  const b = DEMO_BATCHES.find(x=>x.id===batchId && x.tripId===tripId);
  const trip = DEMO_TRIPS.find(t=>t.id===tripId);
  if(!b || !trip) return <div className='min-h-screen flex items-center justify-center text-zinc-300 bg-white'>Invalid link.</div>;
  return (
    <div className='min-h-screen bg-white text-zinc-900'>
      <div className='mx-auto max-w-3xl p-6'>
        <h1 className='text-2xl font-semibold'>Welcome to Zo Trips — {trip.name}</h1>
        <p className='text-zinc-600 mt-1'>{b.name} • {b.start} — {b.end}</p>

        <h2 className='mt-6 font-semibold'>House Rules</h2>
        <ul className='list-disc ml-6 text-zinc-700'>
          <li>Respect local culture and quiet hours.</li>
          <li>No littering; carry back plastic.</li>
          <li>Alcohol only where permitted; no drugs.</li>
        </ul>

        <h2 className='mt-6 font-semibold'>Packing List</h2>
        <ul className='list-disc ml-6 text-zinc-700'>
          <li>Warm layers, rain jacket, sturdy shoes.</li>
          <li>Reusable bottle.</li>
          <li>Personal meds; sunscreen; ID proof.</li>
        </ul>

        <h2 className='mt-6 font-semibold'>Weather</h2>
        <p className='text-zinc-700'>Expect cold mornings and sunny afternoons; check forecast one day prior.</p>
      </div>
    </div>
  )
}
