"use client";

import { recordClick } from "./actions";

export default function ClickableLink({ link, accentColor }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => recordClick(link.id)}
      className="block w-full text-center rounded-lg px-6 py-4 font-medium text-white transition hover:shadow-lg border-2"
      style={{
        backgroundColor: accentColor,
        borderColor: accentColor,
      }}
    >
      {link.title}
    </a>
  );
}
