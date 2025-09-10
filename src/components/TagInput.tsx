// src/components/TagInput.tsx
import { useState } from "react";

export default function TagInput({
  label,
  value,
  onChange,
}: { label: string; value: string[]; onChange: (v: string[]) => void }) {
  const [input, setInput] = useState("");
  const add = (val: string) => {
    const v = val.trim();
    if (!v || value.includes(v)) return;
    onChange([...value, v]);
    setInput("");
  };
  return (
    <label className="block">
      <div className="text-xs text-zinc-400 mb-1">
        {label} <span className="text-rose-400">•</span>
      </div>
      <div className="rounded-xl bg-zinc-900/70 border border-zinc-800 px-2 py-1 flex flex-wrap gap-1">
        {value.map((t) => (
          <span
            key={t}
            className="inline-flex items-center gap-1 rounded-md bg-zinc-800 text-zinc-200 px-2 py-0.5 text-xs"
          >
            {t}
            <button
              type="button"
              onClick={() => onChange(value.filter((x) => x !== t))}
              className="text-zinc-400 hover:text-zinc-200"
            >
              ×
            </button>
          </span>
        ))}
        <input
          className="flex-1 min-w-[120px] bg-transparent outline-none px-1 py-1 text-zinc-100 placeholder-zinc-500"
          placeholder="Type and press Enter"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              add(input);
            }
          }}
        />
      </div>
    </label>
  );
}
