import { useMemo, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { DEMO_BATCHES, DEMO_VENDORS, ServiceType } from '../utils/data'
import { copy } from '../utils/copy'

export default function TripVendors(){
  const { tripId } = useParams();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const preselectBatch = params.get('batch');
  const batches = DEMO_BATCHES.filter(b=>b.tripId===tripId);
  const [selected, setSelected] = useState(preselectBatch || (batches[0]?.id));
  const [service, setService] = useState<ServiceType>('Stay');
  const [note, setNote] = useState('Check‑in window 12:00–14:00. Need rooming list D‑1.');
  const [search, setSearch] = useState('');

  const vendors = useMemo(()=> DEMO_VENDORS.filter(v=> (service? v.type===service : true) && (v.name.toLowerCase().includes(search.toLowerCase()) || v.areas.join(' ').toLowerCase().includes(search.toLowerCase()))), [service, search]);
  const batch = batches.find(b=>b.id===selected);

  function assign(vendorId: string){
    if(!batch) return;
    const existing = batch.vendorAssignments.find(a=>a.type===service);
    if(existing){ existing.vendorId = vendorId } else { batch.vendorAssignments.push({ type: service, vendorId, notes: note }) }
    alert(`Assigned ${service} → vendor set for ${batch.name}`);
  }

  async function saveCopyWhatsApp(){
    if(!batch) return;
    const msg = `Zo Trips request — ${service} for ${batch.name} (${batch.start}–${batch.end}).\n${note}`;
    await copy(msg); alert('Copied WhatsApp message.');
  }

  async function saveCopyEmail(){
    if(!batch) return;
    const msg = `Subject: Zo Trips booking request — ${service} ${batch.start}\n\nHello,\nWe’d like to book: ${service} for ${batch.name} (${batch.start}–${batch.end}).\nNotes: ${note}\n— Zo Trips Ops`;
    await copy(msg); alert('Copied email text.');
  }

  function vendorViewUrl(){
    if(!batch) return '#';
    return `/public/vendor/${batch.tripId}/${batch.id}`;
  }

  return (
    <div className='grid lg:grid-cols-3 gap-6'>
      <div className='lg:col-span-1'>
        <div className='text-sm text-zinc-400 mb-2'>Groups</div>
        <div className='rounded-2xl border border-zinc-800 bg-zinc-900/60 divide-y divide-zinc-800'>
          {batches.map(b => (
            <button key={b.id} onClick={()=>setSelected(b.id)} className={`w-full text-left px-4 py-3 hover:bg-zinc-900/40 ${b.id===selected?'bg-zinc-900/50':''}`}>
              <div className='font-medium'>{b.name} • {b.start}–{b.end}</div>
              <div className='text-xs text-zinc-400'>Vendor: {(b.vendorAssignments[0]?.vendorId? (DEMO_VENDORS.find(v=>v.id===b.vendorAssignments[0].vendorId)?.name) : '— none —')}</div>
            </button>
          ))}
        </div>
      </div>

      <div className='lg:col-span-2'>
        <div className='flex items-center justify-between mb-2'>
          <div className='text-sm text-zinc-400'>Assign Vendor to <span className='text-zinc-200'>{batch?.name}</span></div>
          <div className='flex gap-2'>
            <button className='rounded-xl border border-zinc-700 px-3 py-2' onClick={saveCopyWhatsApp}>Save & Copy WhatsApp</button>
            <button className='rounded-xl border border-zinc-700 px-3 py-2' onClick={saveCopyEmail}>Save & Copy Email</button>
            <a className='rounded-xl border border-zinc-700 px-3 py-2' href={vendorViewUrl()} target='_blank'>View Vendor View</a>
          </div>
        </div>

        <div className='grid md:grid-cols-2 gap-4 mb-4'>
          <div>
            <div className='text-xs text-zinc-400 mb-1'>Service type</div>
            <select className='w-full rounded-xl bg-zinc-900/70 border border-zinc-800 px-3 py-2' value={service} onChange={e=>setService(e.target.value as any)}>
              <option>Stay</option><option>Transfer</option><option>Activity</option><option>Rental</option>
            </select>
          </div>
          <div>
            <div className='text-xs text-zinc-400 mb-1'>Notes to vendor (internal → prefill msg)</div>
            <input className='w-full rounded-xl bg-zinc-900/70 border border-zinc-800 px-3 py-2' value={note} onChange={e=>setNote(e.target.value)} />
          </div>
        </div>

        <div className='mb-2 flex gap-2'>
          <input className='w-80 rounded-xl bg-zinc-900/70 border border-zinc-800 px-3 py-2' placeholder='Search vendor name / area' value={search} onChange={e=>setSearch(e.target.value)} />
        </div>

        <div className='grid md:grid-cols-2 gap-3'>
          {vendors.map(v => (
            <div key={v.id} className='rounded-xl border border-zinc-800 p-3 hover:bg-zinc-900/50'>
              <div className='flex items-center justify-between'>
                <div className='font-medium'>{v.name}</div>
                {v.flags?.preferred && <span className='inline-flex items-center rounded-full border border-zinc-700 px-2 py-0.5 text-xs text-zinc-300'>Preferred</span>}
              </div>
              <div className='text-xs text-zinc-400'>{v.areas.join(', ')} • {v.primary.phone||''}</div>
              <div className='mt-2'><button className='rounded-xl border border-zinc-700 px-3 py-2' onClick={()=>assign(v.id)}>Select</button></div>
            </div>
          ))}
        </div>

        <div className='mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4'>
          <div className='text-sm text-zinc-400 mb-2'>Current assignments</div>
          <ul className='text-sm'>
            {batch?.vendorAssignments.length ? batch.vendorAssignments.map(a=> (
              <li key={a.type}>{a.type} → {(DEMO_VENDORS.find(v=>v.id===a.vendorId)?.name) || '—'}</li>
            )) : <li>—</li>}
          </ul>
        </div>
      </div>
    </div>
  )
}
