"use client";

import { useState, useTransition } from "react";
import { updateTheme } from "./actions";

const THEMES = [
  { id: "ticket-indigo", label: "Ticket · Indigo", swatch: "#5B5FEF" },
  { id: "ticket-rose", label: "Ticket · Rose", swatch: "#F2545B" },
  { id: "ticket-ink", label: "Ticket · Ink", swatch: "#1C2541" },
];

export default function ThemeEditor({ profile }) {
  const [theme, setTheme] = useState(profile.theme);
  const [accent, setAccent] = useState(profile.accent_color);
  const [isPending, startTransition] = useTransition();

  function save(nextTheme, nextAccent) {
    setTheme(nextTheme);
    setAccent(nextAccent);
    startTransition(() => updateTheme(nextTheme, nextAccent));
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      {THEMES.map((t) => (
        <button
          key={t.id}
          onClick={() => save(t.id, t.swatch)}
          className={`flex items-center gap-2 border rounded-full px-3 py-1.5 text-sm focus-ring ${
            theme === t.id ? "border-ink" : "border-line text-ink/60"
          }`}
        >
          <span
            className="w-3 h-3 rounded-full inline-block"
            style={{ background: t.swatch }}
          />
          {t.label}
        </button>
      ))}

      <label className="flex items-center gap-2 text-sm text-ink/60 ml-2">
        Custom accent
        <input
          type="color"
          value={accent}
          onChange={(e) => save(theme, e.target.value)}
          className="w-8 h-8 border border-line rounded cursor-pointer"
        />
      </label>

      {isPending && <span className="text-xs text-ink/40 font-mono">saving…</span>}
    </div>
  );
}
