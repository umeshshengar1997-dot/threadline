"use client";

import { useState, useTransition } from "react";
import { addLink, updateLink, deleteLink, moveLink } from "./actions";

export default function LinkManager({ links }) {
  const [isPending, startTransition] = useTransition();
  const [editingId, setEditingId] = useState(null);

  return (
    <div className="space-y-4">
      <form
        action={(formData) => startTransition(() => addLink(formData))}
        className="flex gap-2 mb-6"
      >
        <input
          name="title"
          placeholder="Link title"
          required
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          name="url"
          placeholder="https://..."
          type="url"
          required
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          disabled={isPending}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 transition"
        >
          Add
        </button>
      </form>

      {links.length === 0 ? (
        <p className="text-center text-gray-500 text-sm py-8">No links yet</p>
      ) : (
        <ul className="space-y-3">
          {links.map((link, i) => (
            <li
              key={link.id}
              className="border border-gray-300 rounded-lg px-4 py-3 flex items-center justify-between bg-white"
            >
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{link.title}</p>
                <p className="text-xs text-gray-500 truncate">{link.url}</p>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <span className="text-xs text-gray-500 shrink-0">
                  {link.click_count} clicks
                </span>
                <button
                  onClick={() =>
                    startTransition(() =>
                      updateLink(link.id, { is_active: !link.is_active })
                    )
                  }
                  className={`text-xs px-2 py-1 rounded-full border shrink-0 ${
                    link.is_active
                      ? "border-indigo-600 text-indigo-600"
                      : "border-gray-300 text-gray-500"
                  }`}
                >
                  {link.is_active ? "Live" : "Hidden"}
                </button>
                <button
                  onClick={() => setEditingId(link.id)}
                  className="text-xs text-gray-500 hover:text-gray-900 shrink-0"
                >
                  Edit
                </button>
                <button
                  onClick={() => startTransition(() => deleteLink(link.id))}
                  className="text-xs text-red-600 hover:text-red-700 shrink-0"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
