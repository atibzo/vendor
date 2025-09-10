export function formatGroupName(dest: string, startISO: string, groupName: string){
  const d = new Date(startISO);
  const dd = d.toLocaleDateString('en-GB', { day:'2-digit', month:'short' }).replace(' ', '-');
  return `ZoTrips | ${dest} ${dd} | ${groupName}`;
}
export function waIntroText(dest: string, groupName: string){
  return `Welcome to Zo Trips ${dest} — ${groupName}! Please pin this chat. The captain will post the plan each evening.`;
}
