import { useParams } from 'react-router-dom'
import { DEMO_BATCHES, DEMO_GUESTS, DEMO_CAPTAINS } from '../utils/data'
export default function BatchDetail(){
  const { batchId } = useParams(); const b = DEMO_BATCHES.find(x=>x.id===batchId)
  if(!b) return <div className='text-zinc-400'>Batch not found.</div>
  const guests = DEMO_GUESTS; const cap1 = DEMO_CAPTAINS.find(c=>c.id===b.captainPrimaryId); const cap2 = DEMO_CAPTAINS.find(c=>c.id===b.captainBackupId)
  return (<div><h2 className='text-lg font-semibold'>{b.name}</h2><div className='text-sm text-zinc-400'>{b.start} → {b.end} • Status: {b.status}</div>
    <div className='mt-4 grid md:grid-cols-2 gap-4'>
      <div className='rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4'><div className='text-sm text-zinc-400'>Captains</div><div>{cap1?.name} {cap1?.phone?`• ${cap1.phone}`:''}</div>{cap2 && <div className='text-zinc-300'>Backup: {cap2.name} {cap2.phone?`• ${cap2.phone}`:''}</div>}</div>
      <div className='rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4'><div className='text-sm text-zinc-400'>Transfer plan</div><div>{b.transferPlan || '—'}</div></div>
    </div>
    <div className='mt-6 rounded-2xl border border-zinc-800 overflow-hidden'><table className='w-full text-sm'><thead className='bg-zinc-900/60 text-zinc-400 uppercase'><tr><th className='px-3 py-2 text-left'>Name</th><th className='px-3 py-2 text-left'>Phone</th><th className='px-3 py-2 text-left'>Gender</th><th className='px-3 py-2 text-left'>Arrival</th><th className='px-3 py-2 text-left'>Room</th><th className='px-3 py-2 text-left'>Diet</th><th className='px-3 py-2 text-left'>Medical</th></tr></thead>
      <tbody className='divide-y divide-zinc-800'>{guests.map(g => (<tr key={g.id}><td className='px-3 py-2'>{g.name}</td><td className='px-3 py-2'>{g.phone}</td><td className='px-3 py-2'>{g.gender||''}</td><td className='px-3 py-2'>{g.arrivalTime||''}</td><td className='px-3 py-2'>{g.room||''}</td><td className='px-3 py-2'>{g.dietNotes||''}</td><td className='px-3 py-2'>{g.medicalNotes||''}</td></tr>))}</tbody></table></div></div>)
}
