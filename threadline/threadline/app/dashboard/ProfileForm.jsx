"use client";

import { useTransition } from "react";
import { updateProfile } from "./actions";

export default function ProfileForm({ profile }) {
  const [isPending, startTransition] = useTransition();

  return (
    <form
      action={(formData) => startTransition(() => updateProfile(formData))}
      className="space-y-4"
    >
      <div>
        <label className="block text-xs font-mono uppercase tracking-wide mb-1">
          Display name
        </label>
        <input
          name="display_name"
          defaultValue={profile.display_name ?? ""}
          placeholder={profile.username}
          className="w-full border border-line rounded-lg px-3 py-2 bg-white text-sm focus-ring"
        />
      </div>
      <div>
        <label className="block text-xs font-mono uppercase tracking-wide mb-1">
          Bio
        </label>
        <textarea
          name="bio"
          defaultValue={profile.bio ?? ""}
          rows={2}
          maxLength={160}
          className="w-full border border-line rounded-lg px-3 py-2 bg-white text-sm focus-ring"
        />
      </div>
      <div>
        <label className="block text-xs font-mono uppercase tracking-wide mb-1">
          Avatar image URL
        </label>
        <input
          name="avatar_url"
          defaultValue={profile.avatar_url ?? ""}
          placeholder="https://..."
          className="w-full border border-line rounded-lg px-3 py-2 bg-white text-sm font-mono focus-ring"
        />
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="bg-ink text-paper px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo focus-ring disabled:opacity-50"
      >
        {isPending ? "Saving…" : "Save profile"}
      </button>
    </form>
  );
}
