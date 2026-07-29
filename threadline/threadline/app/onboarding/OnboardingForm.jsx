"use client";

import { useState } from "react";
import { completeOnboarding } from "./actions";
import AvatarUpload from "./AvatarUpload";

export default function OnboardingForm({ error }) {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [bio, setBio] = useState("");
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsPending(true);

    const formData = new FormData(e.currentTarget);
    if (avatarUrl) {
      formData.set("avatar_url", avatarUrl);
    }

    await completeOnboarding(formData);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-center">
        <AvatarUpload onAvatarUrl={setAvatarUrl} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Display Name
        </label>
        <input
          name="username"
          required
          placeholder="Movieskota"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Bio
        </label>
        <textarea
          name="bio"
          maxLength={160}
          placeholder="Tell people about yourself"
          rows={3}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
        />
        <div className="flex justify-end mt-1">
          <p className="text-xs text-gray-500">
            {bio.length} / 160
          </p>
        </div>
      </div>

      {error && (
        <p className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-lg">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-indigo-600 text-white rounded-full py-3 font-medium text-sm hover:bg-indigo-700 disabled:opacity-50 transition"
      >
        {isPending ? "Setting up..." : "Continue"}
      </button>
    </form>
  );
}
