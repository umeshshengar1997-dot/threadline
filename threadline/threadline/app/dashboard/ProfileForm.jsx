"use client";

import { useTransition, useState } from "react";
import { updateProfile } from "./actions";
import AvatarUpload from "../onboarding/AvatarUpload";

export default function ProfileForm({ profile }) {
  const [isPending, startTransition] = useTransition();
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url || null);
  const [bio, setBio] = useState(profile?.bio || "");

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
      <div className="flex justify-center mb-8">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="avatar"
            className="w-20 h-20 rounded-full object-cover border-4 border-indigo-200"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-gray-200 border-4 border-gray-300"></div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Display Name
        </label>
        <input
          name="display_name"
          defaultValue={profile?.display_name ?? ""}
          placeholder={profile?.username}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Bio
        </label>
        <textarea
          name="bio"
          defaultValue={profile?.bio ?? ""}
          maxLength={160}
          rows={3}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Tell visitors about yourself"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
        />
        <div className="flex justify-end mt-1">
          <p className="text-xs text-gray-500">{bio.length} / 160</p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Avatar
        </label>
        <div className="flex justify-center">
          <AvatarUpload onAvatarUrl={setAvatarUrl} />
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-indigo-600 text-white rounded-lg py-3 font-medium hover:bg-indigo-700 disabled:opacity-50 transition"
      >
        {isPending ? "Saving..." : "Save profile"}
      </button>
    </form>
  );
}
