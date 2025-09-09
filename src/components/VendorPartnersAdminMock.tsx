import React, { useMemo, useState } from "react";

// ---------------------------------------------------------------------------
// Zo Trips — Vendor Partners Admin Mockup (Directory + Profile)
// - Pure React + TailwindCSS
// - Two screens: Vendor Directory (D) and Vendor Profile (E)
// ---------------------------------------------------------------------------

// Small UI helpers -----------------------------------------------------------
const Chip: React.FC<{ color?: string; children: React.ReactNode }> = ({
  color = "lime",
  children,
}) => (
  <span
    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border ${
      color === "lime"
        ? "border-lime-400 text-lime-300 bg-lime-400/10"
        : color === "red"
        ? "border-red-400 text-red-300 bg-red-400/10"
        : color === "amber"
        ? "border-amber-400 text-amber-300 bg-amber-400/10"
        : "border-zinc-600 text-zinc-300 bg-zinc-700/30"
    }`}
  >
    {children}
  </span>
);

const Btn: React.FC<{
  look?: "solid" | "soft" | "ghost";
  onClick?: () => void;
  children: React.ReactNode;
  title?: string;
}> = ({ look = "soft", onClick, children, title }) => (
  <button
    title={title}
    onClick={onClick}
    className={
      look === "solid"
        ? "inline-flex items-center gap-2 rounded-xl bg-lime-400 px-3 py-2 text-zinc-900 font-semibold hover:bg-lime-300"
        : look === "ghost"
        ? "inline-flex items-center gap-2 rounded-xl px-3 py-2 text-zinc-300 hover:bg-zinc-800/80 border border-transparent"
        : "inline-flex items-center gap-2 rounded-xl border border-zinc-700 px-3 py-2 text-zinc-200 hover:bg-zinc-800/80"
    }
  >
    {children}
  </button>
);

const Input: React.FC<{
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ placeholder, value, onChange }) => (
  <input
    className="w-full rounded-xl bg-zinc-900/70 border border-zinc-800 px-3 py-2 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-lime-400/40"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
);

const Badge: React.FC<{ tone?: "green" | "red" | "zinc"; children: React.ReactNode }> = ({
  tone = "zinc",
  children,
}) => (
  <span
    className={
      "inline-flex items-center rounded-lg px-2.5 py-1 text-xs border " +
      (tone === "green"
        ? "bg-emerald-400/10 text-emerald-300 border-emerald-500/40"
        : tone === "red"
        ? "bg-rose-400/10 text-rose-300 border-rose-500/40"
        : "bg-zinc-800/60 text-zinc-300 border-zinc-700")
    }
  >
    {children}
  </span>
);

// Types & demo data ----------------------------------------------------------
export type VendorType = "Stay" | "Transfer" | "Activity" | "Rental";

interface VendorDoc {
  id: string;
  type: string;
  ref?: string;
  expiry?: string; // ISO
  status: "Valid" | "Expired" | "Unknown";
  file?: string; // url
}

interface VendorRecord {
  id: string;
  name: string;
  type: VendorType;
  areas: string[];
  rating?: number; // 0..5
  docsStatus: "Valid" | "Expired" | "Unknown";
  flags: { preferred?: boolean; probation?: boolean; blacklisted?: boolean };
  activeOrders: number;
  lastUsed?: string; // ISO date
  lastContact?: string; // free note
  // profile
  primaryContact: { name: string; phone?: string; whatsapp?: string; email?: string };
  backupContact?: { name: string; phone?: string; whatsapp?: string; email?: string };
  notes?: string;
  docs?: VendorDoc[];
  rateCard?: {
    unit?: string;
    baseNet?: number;
    seasonalNotes?: string[]; // free text lines
    minParty?: number;
    maxParty?: number;
    cancelCutoffText?: string;
  };
  capacity?: string[]; // free text rows
}

const DEMO_VENDORS: VendorRecord[] = [
  {
    id: "v1",
    name: "Himalayan Stays",
    type: "Stay",
    areas: ["Manali", "Kaza"],
    rating: 4.6,
    docsStatus: "Valid",
    flags: { preferred: true },
    activeOrders: 3,
    lastUsed: "2025-09-12",
    lastContact: "WA 10 Sep — confirmed 5 rooms",
    primaryContact: { name: "Tashi", phone: "+91 98100 00000", whatsapp: "+91 98100 00000", email: "ops@himalayanstays.example" },
    backupContact: { name: "Pema", phone: "+91 98200 00000" },
    notes: "Prefers 24h notice on weekends. Check‑in window 12:00–14:00.",
    docs: [
      { id: "d1", type: "Hotel License", ref: "HL-89233", expiry: "2026-03-31", status: "Valid" },
      { id: "d2", type: "Fire NOC", ref: "FN-0187", expiry: "2025-11-15", status: "Valid" },
    ],
    rateCard: {
      unit: "per room / night",
      baseNet: 2800,
      seasonalNotes: [
        "15 May–30 Jun: ₹3,400",
        "20 Dec–05 Jan: ₹3,800 (peak)",
      ],
      minParty: 1,
      maxParty: 6,
      cancelCutoffText: "48h before check‑in",
    },
    capacity: ["Rooms: 6 Standard, 2 Deluxe"],
  },
  {
    id: "v2",
    name: "Kaza Jeep Co.",
    type: "Transfer",
    areas: ["Kaza", "Tabo"],
    rating: 4.2,
    docsStatus: "Expired",
    flags: {},
    activeOrders: 1,
    lastUsed: "2025-09-04",
    lastContact: "Call 03 Sep — 12 pax jeep 06:30",
    primaryContact: { name: "Dorje", phone: "+91 98300 00000", whatsapp: "+91 98300 00000" },
    notes: "Avoids late‑night pickups; prefers 06:00–10:00 window.",
    docs: [
      { id: "d3", type: "Transport Permit", ref: "TP-5512", expiry: "2025-08-31", status: "Expired" },
      { id: "d4", type: "Insurance", ref: "IN-2219", expiry: "2025-12-31", status: "Valid" },
    ],
    rateCard: {
      unit: "per vehicle",
      baseNet: 5200,
      seasonalNotes: ["May–Jun surge +₹600"],
      minParty: 1,
      maxParty: 12,
      cancelCutoffText: "24h before pickup",
    },
    capacity: ["Jeeps Morning 06:00–10:00: 2 vehicles"],
  },
  {
    id: "v3",
    name: "Spiti Guides",
    type: "Activity",
    areas: ["Kaza"],
    rating: 4.8,
    docsStatus: "Unknown",
    flags: { preferred: true },
    activeOrders: 2,
    lastUsed: "2025-08-29",
    lastContact: "Email 29 Aug — monastery tour 10:00",
    primaryContact: { name: "Nawang", phone: "+91 98400 00000" },
    notes: "Bring your own water bottles; limited rental gear.",
    docs: [
      { id: "d5", type: "Guide Association ID", ref: "GA-4411", status: "Unknown" },
    ],
    rateCard: {
      unit: "per person",
      baseNet: 900,
      seasonalNotes: ["Festival week slots limited"],
      minParty: 4,
      maxParty: 18,
      cancelCutoffText: "12h before start",
    },
  },
];

// Directory table ------------------------------------------------------------
function DirectoryTable({
  data,
  onOpenProfile,
}: {
  data: VendorRecord[];
  onOpenProfile: (v: VendorRecord) => void;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800">
      <table className="w-full text-sm">
        <thead className="bg-zinc-900/60 text-zinc-400 uppercase tracking-wide">
          <tr>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Type</th>
            <th className="px-4 py-3 text-left">Areas</th>
            <th className="px-4 py-3 text-left">Docs</th>
            <th className="px-4 py-3 text-left">★ Rating</th>
            <th className="px-4 py-3 text-left">Flags</th>
            <th className="px-4 py-3 text-right">Active Orders</th>
            <th className="px-4 py-3 text-left">Last Used</th>
            <th className="px-4 py-3 text-left">Last Contact</th>
            <th className="px-2 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800">
          {data.map((v) => (
            <tr key={v.id} className="hover:bg-zinc-900/50">
              <td className="px-4 py-3 font-medium text-zinc-100">{v.name}</td>
              <td className="px-4 py-3 text-zinc-300">{v.type}</td>
              <td className="px-4 py-3 text-zinc-300">{v.areas.join(", ")}</td>
              <td className="px-4 py-3">
                {v.docsStatus === "Valid" && <Badge tone="green">Valid</Badge>}
                {v.docsStatus === "Expired" && <Badge tone="red">Expired</Badge>}
                {v.docsStatus === "Unknown" && <Badge>Unknown</Badge>}
              </td>
              <td className="px-4 py-3 text-zinc-200">{v.rating ?? "—"}</td>
              <td className="px-4 py-3 space-x-2">
                {v.flags.preferred && <Chip>Preferred</Chip>}
                {v.flags.probation && <Chip color="amber">Probation</Chip>}
                {v.flags.blacklisted && <Chip color="red">Blacklisted</Chip>}
              </td>
              <td className="px-4 py-3 text-right text-zinc-200">{v.activeOrders}</td>
              <td className="px-4 py-3 text-zinc-300">{v.lastUsed ?? "—"}</td>
              <td className="px-4 py-3 text-zinc-400">{v.lastContact ?? "—"}</td>
              <td className="px-2 py-3 text-right">
                <Btn onClick={() => onOpenProfile(v)}>Open Profile</Btn>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Profile tabs ---------------------------------------------------------------
function OverviewTab({ v }: { v: VendorRecord }) {
  return (
    <div className="grid gap-4 md:grid-cols-5">
      <div className="md:col-span-3 space-y-4">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
          <h4 className="text-sm font-semibold text-zinc-300 mb-3">Contacts</h4>
          <div className="space-y-2 text-zinc-300">
            <div>
              <div className="text-zinc-400 text-xs uppercase">Primary</div>
              <div>
                {v.primaryContact.name} • {v.primaryContact.phone}{" "}
                {v.primaryContact.whatsapp ? (
                  <span className="text-lime-300">(WA)</span>
                ) : null}{" "}
                {v.primaryContact.email ? `• ${v.primaryContact.email}` : ""}
              </div>
            </div>
            {v.backupContact && (
              <div>
                <div className="text-zinc-400 text-xs uppercase">Backup</div>
                <div>
                  {v.backupContact.name}{" "}
                  {v.backupContact.phone ? `• ${v.backupContact.phone}` : ""}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
          <h4 className="text-sm font-semibold text-zinc-300 mb-3">Notes</h4>
          <p className="text-zinc-300 whitespace-pre-line">{v.notes || "—"}</p>
        </div>
      </div>

      <div className="md:col-span-2 space-y-4">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
          <h4 className="text-sm font-semibold text-zinc-300 mb-3">Status</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-zinc-400">Docs:</span>
              {v.docsStatus === "Valid" && <Badge tone="green">Valid</Badge>}
              {v.docsStatus === "Expired" && <Badge tone="red">Expired</Badge>}
              {v.docsStatus === "Unknown" && <Badge>Unknown</Badge>}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-zinc-400">★ Rating:</span>
              <span className="text-zinc-200">{v.rating ?? "—"}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-zinc-400">Last used:</span>
              <span className="text-zinc-200">{v.lastUsed ?? "—"}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-zinc-400">Orders (90d):</span>
              <span className="text-zinc-200">demo</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
          <h4 className="text-sm font-semibold text-zinc-300 mb-3">Flags</h4>
          <div className="flex flex-wrap gap-2">
            {v.flags.preferred && <Chip>Preferred</Chip>}
            {v.flags.probation && <Chip color="amber">Probation</Chip>}
            {v.flags.blacklisted && <Chip color="red">Blacklisted</Chip>}
            {!v.flags.preferred && !v.flags.probation && !v.flags.blacklisted && (
              <span className="text-zinc-400 text-sm">No flags</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function DocsTab({ v }: { v: VendorRecord }) {
  const docs = v.docs ?? [];
  return (
    <div className="rounded-2xl border border-zinc-800 overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-zinc-900/60 text-zinc-400 uppercase tracking-wide">
          <tr>
            <th className="px-4 py-3 text-left">Type</th>
            <th className="px-4 py-3 text-left">Ref</th>
            <th className="px-4 py-3 text-left">Expiry</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800">
          {docs.length === 0 && (
            <tr>
              <td className="px-4 py-6 text-zinc-400" colSpan={5}>No documents yet.</td>
            </tr>
          )}
          {docs.map((d) => (
            <tr key={d.id} className="hover:bg-zinc-900/50">
              <td className="px-4 py-3 text-zinc-200">{d.type}</td>
              <td className="px-4 py-3 text-zinc-300">{d.ref ?? "—"}</td>
              <td className="px-4 py-3 text-zinc-300">{d.expiry ?? "—"}</td>
              <td className="px-4 py-3">
                {d.status === "Valid" && <Badge tone="green">Valid</Badge>}
                {d.status === "Expired" && <Badge tone="red">Expired</Badge>}
                {d.status === "Unknown" && <Badge>Unknown</Badge>}
              </td>
              <td className="px-4 py-3 text-right">
                <Btn look="ghost">Upload / Replace</Btn>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RatesTab({ v }: { v: VendorRecord }) {
  const r = v.rateCard;
  const cap = v.capacity ?? [];
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
        <h4 className="text-sm font-semibold text-zinc-300 mb-3">Rate Card (guidance)</h4>
        <div className="space-y-2 text-zinc-300 text-sm">
          <div><span className="text-zinc-400">Unit:</span> {r?.unit ?? "—"}</div>
          <div><span className="text-zinc-400">Base net:</span> {r?.baseNet ? `₹${r.baseNet.toLocaleString()}` : "—"}</div>
          <div>
            <span className="text-zinc-400">Seasonal notes:</span>
            <ul className="list-disc ml-6 mt-1">
              {(r?.seasonalNotes ?? ["—"]).map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </div>
          <div><span className="text-zinc-400">Party size:</span> {r?.minParty ?? "—"} – {r?.maxParty ?? "—"}</div>
          <div><span className="text-zinc-400">Free‑cancel cutoff:</span> {r?.cancelCutoffText ?? "—"}</div>
        </div>
      </div>
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
        <h4 className="text-sm font-semibold text-zinc-300 mb-3">Capacity hints</h4>
        <ul className="text-zinc-300 text-sm list-disc ml-6">
          {cap.length ? cap.map((c, i) => <li key={i}>{c}</li>) : <li>—</li>}
        </ul>
      </div>
    </div>
  );
}

function OrdersTab({ vendorName }: { vendorName: string }) {
  // Demo orders
  const ORDERS = [
    { id: "o1", date: "2025-09-12", window: "12:00–14:00", group: "Spiti / Summer / Group A", type: "Stay", qty: "5 rooms", status: "Done", files: 2, updated: "12 Sep" },
    { id: "o2", date: "2025-09-02", window: "12:00–14:00", group: "Spiti / Summer / Group B", type: "Stay", qty: "4 rooms", status: "Agreed", files: 1, updated: "30 Aug" },
  ];
  return (
    <div className="rounded-2xl border border-zinc-800 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/60">
        <div className="text-sm text-zinc-400">Orders for {vendorName}</div>
        <Btn>+ Create Order</Btn>
      </div>
      <table className="w-full text-sm">
        <thead className="bg-zinc-900/60 text-zinc-400 uppercase tracking-wide">
          <tr>
            <th className="px-4 py-3 text-left">Date</th>
            <th className="px-4 py-3 text-left">Time</th>
            <th className="px-4 py-3 text-left">Group / Trip</th>
            <th className="px-4 py-3 text-left">Type</th>
            <th className="px-4 py-3 text-left">Qty</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Last update</th>
            <th className="px-4 py-3 text-left">Files</th>
            <th className="px-2 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800">
          {ORDERS.map((o) => (
            <tr key={o.id} className="hover:bg-zinc-900/50">
              <td className="px-4 py-3 text-zinc-200">{o.date}</td>
              <td className="px-4 py-3 text-zinc-300">{o.window}</td>
              <td className="px-4 py-3 text-zinc-300">{o.group}</td>
              <td className="px-4 py-3 text-zinc-300">{o.type}</td>
              <td className="px-4 py-3 text-zinc-300">{o.qty}</td>
              <td className="px-4 py-3">
                <Badge tone={o.status === "Done" ? "green" : "zinc"}>{o.status}</Badge>
              </td>
              <td className="px-4 py-3 text-zinc-400">{o.updated}</td>
              <td className="px-4 py-3 text-zinc-400">{o.files}</td>
              <td className="px-2 py-3 text-right space-x-2">
                <Btn look="ghost">Update</Btn>
                <Btn look="ghost">Copy WA</Btn>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ActivityTab({ v }: { v: VendorRecord }) {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
        <div className="text-sm text-zinc-400">Last used</div>
        <div className="text-lg text-zinc-100 mt-1">{v.lastUsed ?? "—"}</div>
      </div>
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
        <div className="text-sm text-zinc-400">Orders (last 90d)</div>
        <div className="text-lg text-zinc-100 mt-1">demo</div>
      </div>
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
        <div className="text-sm text-zinc-400">Most frequent window</div>
        <div className="text-lg text-zinc-100 mt-1">12:00–14:00</div>
      </div>

      <div className="md:col-span-3 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
        <div className="text-sm font-semibold text-zinc-300 mb-3">Recent contact log</div>
        <ul className="text-sm text-zinc-300 list-disc ml-5 space-y-1">
          <li>10 Sep — WA with Tashi — confirmed 5 rooms, check‑in 12:30</li>
          <li>30 Aug — Call with Pema — blocked 4 rooms for 02 Sep</li>
        </ul>
      </div>
    </div>
  );
}

// Top-level app --------------------------------------------------------------
const TABS_PROFILE: Array<{ key: string; label: string }> = [
  { key: "overview", label: "Overview" },
  { key: "docs", label: "Docs" },
  { key: "rates", label: "Rates & Capacity" },
  { key: "orders", label: "Orders" },
  { key: "activity", label: "Activity" },
];

export default function VendorPartnersAdminMock() {
  const [view, setView] = useState<"directory" | "profile">("directory");
  const [search, setSearch] = useState("");
  const [active, setActive] = useState<VendorRecord | null>(DEMO_VENDORS[0]);
  const [profileTab, setProfileTab] = useState<string>("overview");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return DEMO_VENDORS;
    return DEMO_VENDORS.filter((v) =>
      [v.name, v.type, v.areas.join(" "), v.primaryContact.name]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [search]);

  return (
    <div className="min-h-screen w-full bg-[#0B0C0F] text-zinc-100">
      {/* Header */}
      <div className="sticky top-0 z-20 border-b border-zinc-900/80 bg-[#0B0C0F]/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-2.5 w-2.5 rounded-full bg-lime-400 shadow-[0_0_20px_2px_#a3e635]" />
            <h1 className="text-lg font-semibold tracking-tight">
              Zo Trips — Vendor Partners Admin MVP
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Btn look={view === "directory" ? "solid" : "soft"} onClick={() => setView("directory")}>Directory</Btn>
            <Btn look={view === "profile" ? "solid" : "soft"} onClick={() => setView("profile")}>Profile</Btn>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-7xl px-6 py-6">
        {view === "directory" && (
          <>
            <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="w-full md:max-w-md">
                <Input placeholder="Search vendors…" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
              <div className="flex items-center gap-2">
                <Btn look="soft">Export CSV</Btn>
                <Btn look="soft" title="Creates an empty record (main flow via Typeform)">Add Vendor</Btn>
              </div>
            </div>

            <DirectoryTable
              data={filtered}
              onOpenProfile={(v) => {
                setActive(v);
                setView("profile");
              }}
            />
          </>
        )}

        {view === "profile" && active && (
          <div>
            {/* Profile header */}
            <div className="mb-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-sm text-zinc-400">
                  <span>{active.type}</span>
                  <span>•</span>
                  <span>{active.areas.join(", ")}</span>
                </div>
                <h2 className="text-2xl font-semibold tracking-tight mt-0.5">{active.name}</h2>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  {active.flags.preferred && <Chip>Preferred</Chip>}
                  {active.flags.probation && <Chip color="amber">Probation</Chip>}
                  {active.flags.blacklisted && <Chip color="red">Blacklisted</Chip>}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Btn look="soft">Copy WhatsApp…</Btn>
                <Btn look="soft">Copy Email…</Btn>
                <Btn look="ghost" onClick={() => setView("directory")}>Back to Directory</Btn>
              </div>
            </div>

            {/* Tabs */}
            <div className="mb-4 flex flex-wrap gap-2">
              {TABS_PROFILE.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setProfileTab(t.key)}
                  className={
                    "rounded-xl px-3 py-2 text-sm border " +
                    (profileTab === t.key
                      ? "border-lime-400 text-lime-300 bg-lime-400/10"
                      : "border-zinc-700 text-zinc-300 hover:bg-zinc-900/60")
                  }
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            {profileTab === "overview" && <OverviewTab v={active} />}
            {profileTab === "docs" && <DocsTab v={active} />}
            {profileTab === "rates" && <RatesTab v={active} />}
            {profileTab === "orders" && <OrdersTab vendorName={active.name} />}
            {profileTab === "activity" && <ActivityTab v={active} />}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mx-auto max-w-7xl px-6 py-10 text-center text-xs text-zinc-500">
        MVP mock — static demo data. Replace with your API or Typeform ingest later.
      </div>
    </div>
  );
}
