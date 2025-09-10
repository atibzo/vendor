import { copy } from '../utils/copy'
import { formatGroupName, waIntroText } from '../utils/wa'

export default function HandoverDrawer({ ctx, onClose }:{ ctx:{ destination:string; groupName:string; start:string; phones:string[]; vendorViewUrl:string; welcomeUrl:string }, onClose:()=>void }){
  const groupName = formatGroupName(ctx.destination, ctx.start, ctx.groupName);
  const numbers = ctx.phones.join(',');
  const intro = waIntroText(ctx.destination, ctx.groupName);
  return (
    <div className='fixed inset-0 bg-black/50 flex items-end md:items-center md:justify-center p-0 md:p-10'>
      <div className='w-full md:max-w-xl bg-zinc-950 border border-zinc-800 rounded-t-2xl md:rounded-2xl overflow-hidden'>
        <div className='px-4 py-3 border-b border-zinc-800 flex items-center justify-between'>
          <div className='text-sm text-zinc-400'>Handover to WhatsApp</div>
          <button className='rounded-xl px-3 py-2 text-zinc-300 hover:bg-zinc-900/60' onClick={onClose}>Close</button>
        </div>
        <div className='p-4 space-y-4'>
          <div>
            <div className='text-xs text-zinc-400 mb-1'>Group name</div>
            <div className='rounded-xl bg-zinc-900/70 border border-zinc-800 px-3 py-2'>{groupName}</div>
            <div className='mt-2'><button className='rounded-xl border border-zinc-700 px-3 py-2' onClick={()=>copy(groupName)}>Copy</button></div>
          </div>
          <div>
            <div className='text-xs text-zinc-400 mb-1'>Numbers (comma separated)</div>
            <div className='rounded-xl bg-zinc-900/70 border border-zinc-800 px-3 py-2'>{numbers}</div>
            <div className='mt-2'><button className='rounded-xl border border-zinc-700 px-3 py-2' onClick={()=>copy(numbers)}>Copy</button></div>
          </div>
          <div>
            <div className='text-xs text-zinc-400 mb-1'>Intro message</div>
            <div className='rounded-xl bg-zinc-900/70 border border-zinc-800 px-3 py-2'>{intro}</div>
            <div className='mt-2'><button className='rounded-xl border border-zinc-700 px-3 py-2' onClick={()=>copy(intro)}>Copy</button></div>
          </div>
          <div className='flex gap-2'>
            <a className='rounded-xl border border-zinc-700 px-3 py-2' href={ctx.vendorViewUrl} target='_blank'>Open Vendor View</a>
            <a className='rounded-xl border border-zinc-700 px-3 py-2' href={ctx.welcomeUrl} target='_blank'>Open Welcome Pack</a>
          </div>
          <div className='text-xs text-zinc-500'>WhatsApp doesn’t allow auto‑creation; paste the name & numbers when creating the group.</div>
        </div>
      </div>
    </div>
  )
}
