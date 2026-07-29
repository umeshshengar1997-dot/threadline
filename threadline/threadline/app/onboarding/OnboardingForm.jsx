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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-xs font-mono uppercase tracking-wide mb-2 text-ink/60">
          Username
        </label>
        <input
          name="username"
          required
          placeholder="yourname"
          className="w-full border border-line rounded-lg px-4 py-2.5 bg-white text-sm focus-ring"
        />
        <p className="text-xs text-ink/40 mt-1">
          threadline.app/<span className="font-mono">your-username</span>
        </p>
      </div>

      <div>
        <label className="block text-xs font-mono uppercase tracking-wide mb-2 text-ink/60">
          Bio (optional)
        </label>
        <textarea
          name="bio"
          maxLength={160}
          placeholder="Tell people a bit about yourself"
          rows={3}
          className="w-full border border-line rounded-lg px-4 py-2.5 bg-white text-sm focus-ring resize-none"
        />
        <p className="text-xs text-ink/40 mt-1">Max 160 characters</p>
      </div>

      <AvatarUpload onAvatarUrl={setAvatarUrl} />

      {error && <p className="text-rose text-sm bg-rose/10 p-3 rounded-lg">{error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-indigo text-paper rounded-lg py-2.5 font-medium hover:bg-indigo-dark focus-ring disabled:opacity-50 transition text-sm"
      >
        {isPending ? "Setting up..." : "Get started"}
      </button>
    </form>
  );
}
