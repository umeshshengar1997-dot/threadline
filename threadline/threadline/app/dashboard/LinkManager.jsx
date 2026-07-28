"use client";

import { useState, useTransition } from "react";
import { addLink, updateLink, deleteLink, moveLink } from "./actions";

export default function LinkManager({ links }) {
  const [isPending, startTransition] = useTransition();
  const [editingId, setEditingId] = useState(null);

  return (
    <div>
      <form
        action={(formData) => startTransition(() => addLink(formData))}
        className="flex gap-2 mb-6"
      >
        <input
          name="title"
          placeholder="Link title"
          required
          className="flex-1 border border-line rounded-lg px-3 py-2 bg-white text-sm focus-ring"
        />
        <input
          name="url"
          placeholder="https://..."
          type="url"
          required
          className="flex-1 border border-line rounded-lg px-3 py-2 bg-white text-sm focus-ring"
        />
        <button
          type="submit"
          disabled={isPending}
          className="bg-ink text-paper px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo focus-ring disabled:opacity-50"
        >
          Add
        </button>
      </form>

      {links.length === 0 && (
        <p className="text-sm text-ink/50 font-mono">
          No links yet — add your first one above.
        </p>
      )}

      <ul className="space-y-2">
        {links.map((link, i) => (
          <li
            key={link.id}
            className="border border-line rounded-lg px-4 py-3 bg-white flex items-center gap-3"
          >
            {editingId === link.id ? (
              <EditRow
                link={link}
                onDone={() => setEditingId(null)}
              />
            ) : (
              <>
                <div className="flex flex-col gap-0.5">
                  <button
                    aria-label="Move up"
                    disabled={i === 0}
                    onClick={() => startTransition(() => moveLink(link.id, "up", links))}
                    className="text-ink/40 hover:text-ink disabled:opacity-20 focus-ring rounded text-xs"
                  >
                    ▲
                  </button>
                  <button
                    aria-label="Move down"
                    disabled={i === links.length - 1}
                    onClick={() => startTransition(() => moveLink(link.id, "down", links))}
                    className="text-ink/40 hover:text-ink disabled:opacity-20 focus-ring rounded text-xs"
                  >
                    ▼
                  </button>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{link.title}</p>
                  <p className="text-xs text-ink/50 truncate font-mono">{link.url}</p>
                </div>

                <span className="text-xs text-ink/40 font-mono shrink-0">
                  {link.click_count} clicks
                </span>

                <button
                  onClick={() =>
                    startTransition(() =>
                      updateLink(link.id, { is_active: !link.is_active })
                    )
                  }
                  className={`text-xs px-2 py-1 rounded-full border shrink-0 focus-ring ${
                    link.is_active
                      ? "border-indigo text-indigo"
                      : "border-line text-ink/40"
                  }`}
                >
                  {link.is_active ? "Live" : "Hidden"}
                </button>

                <button
                  onClick={() => setEditingId(link.id)}
                  className="text-xs text-ink/50 hover:text-ink focus-ring shrink-0"
                >
                  Edit
                </button>
                <button
                  onClick={() => startTransition(() => deleteLink(link.id))}
                  className="text-xs text-rose hover:text-rose/80 focus-ring shrink-0"
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function EditRow({ link, onDone }) {
  const [isPending, startTransition] = useTransition();

  return (
    <form
      action={(formData) =>
        startTransition(async () => {
          await updateLink(link.id, {
            title: formData.get("title"),
            url: formData.get("url"),
          });
          onDone();
        })
      }
      className="flex-1 flex gap-2 items-center"
    >
      <input
        name="title"
        defaultValue={link.title}
        className="flex-1 border border-line rounded-lg px-2 py-1 text-sm focus-ring"
      />
      <input
        name="url"
        defaultValue={link.url}
        className="flex-1 border border-line rounded-lg px-2 py-1 text-sm font-mono focus-ring"
      />
      <button
        type="submit"
        disabled={isPending}
        className="text-xs bg-indigo text-paper px-3 py-1.5 rounded-full focus-ring"
      >
        Save
      </button>
      <button
        type="button"
        onClick={onDone}
        className="text-xs text-ink/50 focus-ring"
      >
        Cancel
      </button>
    </form>
  );
}
