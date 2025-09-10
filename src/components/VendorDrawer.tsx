// src/components/VendorDrawer.tsx
import { useMemo, useState } from "react";
import TagInput from "./TagInput";
import { addVendor, findVendorDuplicates } from "../utils/db";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function VendorDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<"manual" | "typeform">("manual");
  const [preferred, setPreferred] = useState(false);
  const [areas, setAreas] = useState<string[]>(["Manali", "Kaza"]);
  const [form, setForm] = useState({
    type: "Stay",
    name: "",
    primaryName: "",
    primaryPhone: "",
    backupName: "",
    backupPhone: "",
    capacity: "",
    notes: "",
  });

  const dups = useMemo(
    () => findVendorDuplicates(form.name, areas.join(","), form.primaryPhone),
    [form.name, form.primaryPhone, areas]
  );

  const navigate = useNavigate();
  const [params] = useSearchParams();
  const batchId = params.get("batch");
  const tripId = "t1"; // MVP single-trip assumption

  const save = (assign = false) => {
    if (
      !form.type ||
      !form.name ||
      !areas.length ||
      !form.primaryName ||
      !form.primaryPhone
    ) {
      alert("Please fill required fields.");
      return;
    }
    const vendor = addVendor({
      name: form.name,
      type: form.type as any,
      areas,
      primary: { name: form.primaryName, phone: form.primaryPhone },
      backup:
        form.backupName || form.backupPhone
          ? { name: form.backupName, phone: form.backupPhone }
          : undefined,
      docs: [],
      rating: undefined,
      flags: { preferred },
    });
    if (assign) {
      const url = batchId
        ? `/admin/trips/${tripId}/vendors?batch=${batchId}&selectVendor=${vendor.id}`
        : `/admin/trips/${tripId}/vendors?selectVendor=${vendor.id}`;
      navigate(url);
    }
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="hidden md:block flex-1 bg-black/40" onClick={onClose} />
      <aside className="w-full md:max-w-xl bg-[#0B0C0F] border-l border-zinc-900/80 shadow-2xl flex flex-col">
        <div className="px-4 py-3 border-b border-zinc-900/80 flex items-center justify-between">
          <div className="text-sm text-zinc-300">Add Vendor</div>
          <button
            className="rounded-xl px-3 py-2 text-zinc-300 hover:bg-zinc-900/60"
            onClick={onClose}
          >
            Close
          </button>
        </div>

        <div className="px-4 py-3 flex gap-2 border-b border-zinc-900/80">
          <button
            onClick={() => setTab("manual")}
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs border ${
              tab === "manual"
                ? "border-lime-400 text-lime-300 bg-lime-400/10"
                : "border-zinc-700 text-zinc-300 hover:bg-zinc-900/60"
            }`}
          >
            Manual
          </button>
          <button
            onClick={() => setTab("typeform")}
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs border ${
              tab === "typeform"
                ? "border-lime-400 text-lime-300 bg-lime-400/10"
                : "border-zinc-700 text-zinc-300 hover:bg-zinc-900/60"
            }`}
          >
            From Typeform
          </button>
        </div>

        <div className="p-4 overflow-auto flex-1">
          {tab === "manual" ? (
            <div className="space-y-4">
              {dups.length > 0 && (
                <div className="rounded-xl border border-amber-500/40 bg-amber-400/10 p-3 text-amber-200 text-sm">
                  Possible duplicate:{" "}
                  <b className="text-amber-100">{dups[0].name}</b>.{" "}
                  <span className="underline">Open existing</span> or{" "}
                  <span className="underline">Create anyway</span>.
                </div>
              )}

              <label className="block">
                <div className="text-xs text-zinc-400 mb-1">
                  Vendor type <span className="text-rose-400">•</span>
                </div>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full rounded-xl bg-zinc-900/70 border border-zinc-800 px-3 py-2 text-zinc-100"
                >
                  <option>Stay</option>
                  <option>Transfer</option>
                  <option>Activity</option>
                  <option>Rental</option>
                </select>
              </label>

              <label className="block">
                <div className="text-xs text-zinc-400 mb-1">
                  Vendor name <span className="text-rose-400">•</span>
                </div>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Himalayan Stays"
                  className="w-full rounded-xl bg-zinc-900/70 border border-zinc-800 px-3 py-2 text-zinc-100"
                />
              </label>

              <TagInput label="Areas" value={areas} onChange={setAreas} />

              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <div className="text-xs text-zinc-400 mb-1">
                    Primary contact — name <span className="text-rose-400">•</span>
                  </div>
                  <input
                    value={form.primaryName}
                    onChange={(e) =>
                      setForm({ ...form, primaryName: e.target.value })
                    }
                    placeholder="Tashi"
                    className="w-full rounded-xl bg-zinc-900/70 border border-zinc-800 px-3 py-2 text-zinc-100"
                  />
                </label>
                <label className="block">
                  <div className="text-xs text-zinc-400 mb-1">
                    Primary contact — phone/WhatsApp{" "}
                    <span className="text-rose-400">•</span>
                  </div>
                  <input
                    value={form.primaryPhone}
                    onChange={(e) =>
                      setForm({ ...form, primaryPhone: e.target.value })
                    }
                    placeholder="+91 98…"
                    className="w-full rounded-xl bg-zinc-900/70 border border-zinc-800 px-3 py-2 text-zinc-100"
                  />
                </label>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <div className="text-xs text-zinc-400 mb-1">
                    Backup contact — name
                  </div>
                  <input
                    value={form.backupName}
                    onChange={(e) =>
                      setForm({ ...form, backupName: e.target.value })
                    }
                    placeholder="Pema"
                    className="w-full rounded-xl bg-zinc-900/70 border border-zinc-800 px-3 py-2 text-zinc-100"
                  />
                </label>
                <label className="block">
                  <div className="text-xs text-zinc-400 mb-1">
                    Backup contact — phone
                  </div>
                  <input
                    value={form.backupPhone}
                    onChange={(e) =>
                      setForm({ ...form, backupPhone: e.target.value })
                    }
                    placeholder="+91 98…"
                    className="w-full rounded-xl bg-zinc-900/70 border border-zinc-800 px-3 py-2 text-zinc-100"
                  />
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  id="pref"
                  type="checkbox"
                  checked={preferred}
                  onChange={() => setPreferred(!preferred)}
                />
                <label htmlFor="pref" className="text-sm text-zinc-300">
                  Preferred
                </label>
              </div>

              <label className="block">
                <div className="text-xs text-zinc-400 mb-1">
                  Capacity hint (optional)
                </div>
                <input
                  value={form.capacity}
                  onChange={(e) =>
                    setForm({ ...form, capacity: e.target.value })
                  }
                  placeholder="2 jeeps AM window / 6 Std + 2 DLX"
                  className="w-full rounded-xl bg-zinc-900/70 border border-zinc-800 px-3 py-2 text-zinc-100"
                />
              </label>

              <label className="block">
                <div className="text-xs text-zinc-400 mb-1">Notes (internal)</div>
                <textarea
                  value={form.notes}
                  onChange={(e) =>
                    setForm({ ...form, notes: e.target.value })
                  }
                  placeholder="Any ops notes…"
                  className="w-full rounded-xl bg-zinc-900/70 border border-zinc-800 px-3 py-2 h-24 text-zinc-100"
                />
              </label>
            </div>
          ) : (
            <div className="space-y-4">
              <label className="block">
                <div className="text-xs text-zinc-400 mb-1">
                  Typeform submission URL / ID
                </div>
                <input
                  placeholder="https://… or ABC123"
                  className="w-full rounded-xl bg-zinc-900/70 border border-zinc-800 px-3 py-2 text-zinc-100"
                />
              </label>
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-3">
                <div className="text-sm text-zinc-400 mb-2">Preview</div>
                <div className="text-sm text-zinc-300">
                  Himalayan Stays • Stay • Manali/Kaza • +91 98100 00000
                </div>
              </div>
              <div className="text-xs text-zinc-500">
                Create Vendor will prefill the Manual tab—you can edit before
                saving.
              </div>
            </div>
          )}
          <div className="h-24" />
        </div>

        <div className="border-t border-zinc-900/80 p-4 flex items-center justify-between bg-[#0B0C0F]">
          <div className="text-xs text-zinc-500">
            Required fields marked with <span className="text-rose-400">•</span>
          </div>
          <div className="flex gap-2">
            <button
              className="rounded-xl border border-zinc-700 px-3 py-2"
              onClick={() => save(false)}
            >
              Save Vendor
            </button>
            <button
              className="rounded-xl bg-lime-400 text-zinc-900 font-semibold px-3 py-2 hover:bg-lime-300"
              onClick={() => save(true)}
            >
              Save & Assign to Group
            </button>
            <button
              className="rounded-xl px-3 py-2 text-zinc-300 hover:bg-zinc-900/60"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
