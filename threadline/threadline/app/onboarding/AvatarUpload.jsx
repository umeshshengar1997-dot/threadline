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

      // Upload to Supabase Storage in the "avatars" bucket
      const fileName = `${user.id}-${Date.now()}-${file.name}`;
      const { error: uploadError, data } = await supabase.storage
        .from("avatars")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get the public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(data.path);

      // Pass the URL back to the form via a hidden input
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
      <label className="block text-xs font-mono uppercase tracking-wide mb-2">
        Avatar (optional)
      </label>
      <div className="flex items-end gap-3">
        <div className="flex-1">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            className="block w-full text-sm text-ink/60 file:bg-line file:border-0 file:rounded-lg file:px-3 file:py-1.5 file:text-xs file:font-medium"
          />
          {error && <p className="text-rose text-xs mt-1">{error}</p>}
        </div>
        {preview && (
          <img
            src={preview}
            alt="preview"
            className="w-12 h-12 rounded-full object-cover border border-line"
          />
        )}
      </div>
      {uploading && <p className="text-xs text-ink/40 font-mono mt-1">uploading...</p>}
    </div>
  );
}
