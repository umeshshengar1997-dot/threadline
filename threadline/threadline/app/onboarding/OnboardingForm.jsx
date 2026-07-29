"use client";

import { useState } from "react";
import { completeOnboarding } from "./actions";
import AvatarUpload from "./AvatarUpload";

export default function OnboardingForm({ error }) {
  const [avatarUrl, setAvatarUrl] = useState(null);
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-mono uppercase tracking-wide mb-1">
          Username
        </label>
        <input
          name="username"
          required
          placeholder="yourname"
          className="w-full border border-line rounded-lg px-3 py-2 bg-white text-sm focus-ring"
        />
      </div>

      <div>
        <label className="block text-xs font-mono uppercase tracking-wide mb-1">
          Bio (optional)
        </label>
        <textarea
          name="bio"
          maxLength={160}
          placeholder="Tell people a bit about yourself"
          rows={2}
          className="w-full border border-line rounded-lg px-3 py-2 bg-white text-sm focus-ring"
        />
        <p className="text-xs text-ink/40 mt-1">Max 160 characters</p>
      </div>

      <AvatarUpload onAvatarUrl={setAvatarUrl} />

      {error && <p className="text-rose text-sm">{error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-indigo text-paper rounded-full py-2.5 font-medium hover:bg-indigo-dark focus-ring disabled:opacity-50"
      >
        {isPending ? "Setting up..." : "Get started"}
      </button>
    </form>
  );
}
