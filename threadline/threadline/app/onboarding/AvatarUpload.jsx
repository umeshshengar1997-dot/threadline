"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function AvatarUpload({ onAvatarUrl }) {
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  async function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }

    setError(null);
    setUploading(true);

    // Show preview immediately
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreview(event.target?.result);
    };
    reader.readAsDataURL(file);

    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("Not logged in");

      // Upload to Supabase Storage
      const fileName = `${user.id}-${Date.now()}-${file.name}`;
      const { error: uploadError, data } = await supabase.storage
        .from("avatars")
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get the public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(data.path);

      onAvatarUrl(publicUrl);
    } catch (err) {
      setError(err.message || "Upload failed");
      setPreview(null);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <label className="block text-xs font-mono uppercase tracking-wide mb-3 text-ink/60">
        Avatar (optional)
      </label>
      <div className="flex items-end gap-4">
        <div className="flex-1">
          <label className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-line rounded-lg cursor-pointer hover:border-indigo hover:bg-black/2 transition">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={uploading}
              className="hidden"
            />
            <span className="text-sm font-medium text-ink/60">
              {uploading ? "Uploading..." : "Choose image"}
            </span>
          </label>
          {error && <p className="text-rose text-xs mt-2">{error}</p>}
        </div>
        {preview && (
          <img
            src={preview}
            alt="preview"
            className="w-14 h-14 rounded-full object-cover border-2 border-indigo flex-shrink-0"
          />
        )}
      </div>
    </div>
  );
}
