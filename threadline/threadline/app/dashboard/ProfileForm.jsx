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
    <form onSubmit={handleSubmit} className="space-y-6">
      {avatarUrl && (
        <div className="flex justify-center">
          <img
            src={avatarUrl}
            alt="avatar"
            className="w-20 h-20 rounded-full object-cover border-2 border-indigo"
          />
        </div>
      )}

      <div>
        <label className="block text-xs font-mono uppercase tracking-wide mb-2 text-ink/60">
          Display name
        </label>
        <input
          name="display_name"
          defaultValue={profile?.display_name ?? ""}
          placeholder={profile?.username}
          className="w-full border border-line rounded-lg px-4 py-2.5 bg-white text-sm focus-ring"
        />
      </div>

      <div>
        <label className="block text-xs font-mono uppercase tracking-wide mb-2 text-ink/60">
          Bio
        </label>
        <textarea
          name="bio"
          defaultValue={profile?.bio ?? ""}
          rows={3}
          maxLength={160}
          placeholder="Tell visitors about yourself"
          className="w-full border border-line rounded-lg px-4 py-2.5 bg-white text-sm focus-ring resize-none"
        />
        <p className="text-xs text-ink/40 mt-1">
          {(profile?.bio ?? "").length} / 160 characters
        </p>
      </div>

      <AvatarUpload onAvatarUrl={setAvatarUrl} />

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-indigo text-paper px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-dark focus-ring disabled:opacity-50 transition"
      >
        {isPending ? "Saving..." : "Save profile"}
      </button>
    </form>
  );
}
