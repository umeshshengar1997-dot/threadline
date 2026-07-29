"use client";

import { useTransition, useState } from "react";
import { updateProfile } from "./actions";
import AvatarUpload from "../onboarding/AvatarUpload";

export default function ProfileForm({ profile }) {
  const [isPending, startTransition] = useTransition();
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url || null);

  async function handleSubmit(e) {
    e.preventDefault();
    startTransition(async () => {
      const formData = new FormData(e.currentTarget);
      if (avatarUrl) {
        formData.set("avatar_url", avatarUrl);
      }
      await updateProfile(formData);
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {avatarUrl && (
        <div className="flex justify-center mb-4">
          <img
            src={avatarUrl}
            alt="avatar"
            className="w-16 h-16 rounded-full object-cover border border-line"
          />
        </div>
      )}

      <div>
        <label className="block text-xs font-mono uppercase tracking-wide mb-1">
          Display name
        </label>
        <input
          name="display_name"
          defaultValue={profile?.display_name ?? ""}
          placeholder={profile?.username}
          className="w-full border border-line rounded-lg px-3 py-2 bg-white text-sm focus-ring"
        />
      </div>

      <div>
        <label className="block text-xs font-mono uppercase tracking-wide mb-1">
          Bio
        </label>
        <textarea
          name="bio"
          defaultValue={profile?.bio ?? ""}
          rows={2}
          maxLength={160}
          className="w-full border border-line rounded-lg px-3 py-2 bg-white text-sm focus-ring"
        />
      </div>

      <AvatarUpload onAvatarUrl={setAvatarUrl} />

      <button
        type="submit"
        disabled={isPending}
        className="bg-ink text-paper px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo focus-ring disabled:opacity-50"
      >
        {isPending ? "Saving..." : "Save profile"}
      </button>
    </form>
  );
}
