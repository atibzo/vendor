export type Status = 'Draft' | 'On sale' | 'Confirmed' | 'Live' | 'Done';
export type ServiceType = 'Stay' | 'Transfer' | 'Activity' | 'Rental';

export interface Captain { id: string; name: string; phone?: string; }
export interface Guest { id: string; name: string; phone: string; gender?: 'M'|'F'|'O'; arrivalTime?: string; room?: string; dietNotes?: string; medicalNotes?: string; }
export interface VendorDoc { type: string; ref?: string; expiry?: string; status: 'Valid'|'Expired'|'Unknown' }
export interface Vendor { id: string; name: string; type: ServiceType; areas: string[]; primary: { name: string; phone?: string; whatsapp?: string; email?: string }; backup?: { name: string; phone?: string }; docs?: VendorDoc[]; rating?: number; flags?: { preferred?: boolean; probation?: boolean; blacklisted?: boolean } }
export interface Trip { id: string; name: string; }
export interface Itinerary { id: string; tripId: string; name: string; }
export interface Batch { id: string; tripId: string; itineraryId: string; name: string; start: string; end: string; seats: { sold: number; total: number }; status: Status; captainPrimaryId?: string; captainBackupId?: string; vendorAssignments: { type: ServiceType; vendorId: string; notes?: string }[]; guestIds: string[]; transferPlan?: string; }

export const DEMO_TRIPS: Trip[] = [
  { id: 't1', name: 'Arunachal Pradesh (Tawang)' }
];

export const DEMO_ITINERARIES: Itinerary[] = [
  { id: 'it1', tripId: 't1', name: 'Summer' },
  { id: 'it2', tripId: 't1', name: 'Winter' }
];

export const DEMO_CAPTAINS: Captain[] = [
  { id: 'c1', name: 'Aman', phone: '+91 98xxxxxxx1' },
  { id: 'c2', name: 'Riya', phone: '+91 98xxxxxxx2' }
];

export const DEMO_VENDORS: Vendor[] = [
  {
    id: 'v1',
    name: 'Himalayan Stays',
    type: 'Stay',
    areas: ['Manali','Kaza'],
    primary: { name: 'Tashi', phone:'+91 98100 00000', whatsapp:'+91 98100 00000', email:'ops@himalayanstays.example' },
    rating: 4.6,
    flags: { preferred: true },
    docs: [{ type:'Hotel License', ref:'HL-89233', expiry:'2026-03-31', status:'Valid' }]
  },
  {
    id: 'v2',
    name: 'Kaza Jeep Co.',
    type: 'Transfer',
    areas: ['Kaza','Tabo'],
    primary: { name: 'Dorje', phone:'+91 98300 00000', whatsapp:'+91 98300 00000' },
    rating: 4.2,
    docs: [{ type:'Transport Permit', ref:'TP-5512', expiry:'2025-08-31', status:'Expired' }]
  },
  {
    id: 'v3',
    name: 'Spiti Guides',
    type: 'Activity',
    areas: ['Kaza'],
    primary: { name: 'Nawang', phone:'+91 98400 00000' },
    rating: 4.8,
    flags: { preferred: true }
  }
];

export const DEMO_GUESTS: Guest[] = [
  { id:'g1', name:'Anita Sharma', phone:'+91 9xxxxxxxx1', gender:'F', arrivalTime:'10:30', room:'STD-101', dietNotes:'Veg' },
  { id:'g2', name:'Rohit Verma', phone:'+91 9xxxxxxxx2', gender:'M', arrivalTime:'10:30', room:'STD-102', medicalNotes:'Asthma—carry inhaler' },
  { id:'g3', name:'Maya Rao', phone:'+91 9xxxxxxxx3', gender:'F', arrivalTime:'11:15', room:'STD-103' }
];

export const DEMO_BATCHES: Batch[] = [
  {
    id:'b1',
    tripId:'t1',
    itineraryId:'it1',
    name:'Group A',
    start:'2025-06-01',
    end:'2025-06-07',
    seats:{ sold:12, total:20 },
    status:'Confirmed',
    captainPrimaryId:'c1',
    captainBackupId:'c2',
    vendorAssignments:[{ type:'Stay', vendorId:'v1' }],
    guestIds:['g1','g2','g3'],
    transferPlan:'Day 2 Tawang→Bumla 06:30; Day 4 Pangong loop'
  },
  {
    id:'b2',
    tripId:'t1',
    itineraryId:'it1',
    name:'Group B',
    start:'2025-06-15',
    end:'2025-06-21',
    seats:{ sold:0, total:20 },
    status:'On sale',
    vendorAssignments:[],
    guestIds:[]
  }
];
