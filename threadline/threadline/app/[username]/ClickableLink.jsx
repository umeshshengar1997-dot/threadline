"use client";

import { recordClick } from "./actions";

export default function ClickableLink({ link, accent, isDark }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => recordClick(link.id)}
      className="block w-full text-center rounded-full px-5 py-3 font-medium border transition-colors focus-ring"
      style={{
        borderColor: accent,
        color: isDark ? "#FAF7F0" : "#1C2541",
        backgroundColor: "transparent",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = accent + "20")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
    >
      {link.title}
    </a>
  );
}
