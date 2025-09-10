import { Link } from 'react-router-dom'
import { DEMO_VENDORS } from '../utils/data'

export default function VendorsDirectory(){
  return (
    <div>
      <div className='mb-3 flex items-center justify-between'>
        <h2 className='text-lg font-semibold'>Directory</h2>
        <div className='flex gap-2'>
          <button className='rounded-xl border border-zinc-700 px-3 py-2'>Export CSV</button>
          <button className='rounded-xl bg-lime-400 text-zinc-900 font-semibold px-3 py-2'>Add Vendor</button>
        </div>
      </div>
      <div className='overflow-hidden rounded-2xl border border-zinc-800'>
        <table className='w-full text-sm'>
          <thead className='bg-zinc-900/60 text-zinc-400 uppercase'>
            <tr>
              <th className='px-4 py-3 text-left'>Name</th>
              <th className='px-4 py-3 text-left'>Type</th>
              <th className='px-4 py-3 text-left'>Areas</th>
              <th className='px-4 py-3 text-left'>Docs</th>
              <th className='px-4 py-3 text-left'>★</th>
              <th className='px-4 py-3 text-left'>Flags</th>
              <th className='px-4 py-3 text-right'>Actions</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-zinc-800'>
            {DEMO_VENDORS.map(v => (
              <tr key={v.id} className='hover:bg-zinc-900/50'>
                <td className='px-4 py-3 font-medium'>{v.name}</td>
                <td className='px-4 py-3'>{v.type}</td>
                <td className='px-4 py-3'>{v.areas.join(', ')}</td>
                <td className='px-4 py-3'>{v.docs?.[0]?.status || 'Unknown'}</td>
                <td className='px-4 py-3'>{v.rating || '—'}</td>
                <td className='px-4 py-3'>{v.flags?.preferred ? 'Preferred' : ''}</td>
                <td className='px-4 py-3 text-right space-x-2'>
                  <Link to={`/admin/vendors/${v.id}`} className='rounded-xl border border-zinc-700 px-3 py-2 inline-block'>Open</Link>
                  <Link to={`/admin/trips/t1/vendors?assign=${v.id}`} className='rounded-xl border border-zinc-700 px-3 py-2 inline-block'>Assign to Group</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
