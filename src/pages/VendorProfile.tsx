import { useParams } from 'react-router-dom'
import { DEMO_VENDORS } from '../utils/data'

export default function VendorProfile(){
  const { vendorId } = useParams();
  const v = DEMO_VENDORS.find(x=>x.id===vendorId);
  if(!v) return <div className='text-zinc-400'>Vendor not found.</div>;

  return (
    <div>
      <div className='flex items-center justify-between mb-3'>
        <div>
          <div className='text-sm text-zinc-400'>Vendors / {v.type}</div>
          <h2 className='text-lg font-semibold'>{v.name}</h2>
        </div>
        <div className='flex gap-2'>
          <span className='inline-flex items-center rounded-full border border-zinc-700 px-2 py-0.5 text-xs text-zinc-300'>{v.flags?.preferred ? 'Preferred' : '—'}</span>
          <button className='rounded-xl border border-zinc-700 px-3 py-2'>Assign to Group</button>
        </div>
      </div>

      <div className='grid lg:grid-cols-3 gap-6'>
        <div className='lg:col-span-2'>
          <div className='rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 mb-4'>
            <div className='grid md:grid-cols-2 gap-4 text-sm'>
              <div>
                <div className='text-zinc-400'>Areas</div>
                <div>{v.areas.join(', ')}</div>
              </div>
              <div>
                <div className='text-zinc-400'>Contacts</div>
                <div>Primary: {v.primary.name} {v.primary.phone ? `• ${v.primary.phone}` : ''}</div>
                {v.backup && <div>Backup: {v.backup.name} {v.backup.phone ? `• ${v.backup.phone}` : ''}</div>}
              </div>
              <div>
                <div className='text-zinc-400'>Docs</div>
                <div>{v.docs?.[0]?.status || 'Unknown'}</div>
              </div>
              <div>
                <div className='text-zinc-400'>★ Rating</div>
                <div>{v.rating || '—'}</div>
              </div>
            </div>
          </div>

          <div className='rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4'>
            <div className='text-sm text-zinc-400 mb-2'>Recent groups (last 90d)</div>
            <div className='text-sm space-y-1'>
              <div>Experience Ladakh — Group A — 01–07 Jun</div>
              <div>Experience Spiti — Group C — 22–28 May</div>
            </div>
          </div>
        </div>

        <div className='lg:col-span-1'>
          <div className='rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 mb-4'>
            <div className='text-sm text-zinc-400 mb-2'>Documents</div>
            {(v.docs || []).map((d, i) => (
              <div key={i} className='flex items-center justify-between text-sm'>
                <div>{d.type} • {d.ref || ''} • {d.expiry || ''}</div>
                <button className='rounded-xl px-3 py-2 text-zinc-300 hover:bg-zinc-900/60'>Replace</button>
              </div>
            ))}
          </div>

          <div className='rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4'>
            <div className='text-sm text-zinc-400 mb-2'>Notes</div>
            <div className='text-sm text-zinc-300'>
              Prefers 24h notice on weekends. Check‑in window 12:00–14:00.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
