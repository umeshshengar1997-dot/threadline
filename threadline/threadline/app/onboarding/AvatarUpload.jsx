"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function AvatarUpload({ onAvatarUrl }) {
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  async function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

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

      const fileName = `${user.id}-${Date.now()}-${file.name}`;
      const { error: uploadError, data } = await supabase.storage
        .from("avatars")
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(data.path);

      onAvatarUrl(publicUrl);
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="relative">
      <label htmlFor="avatar-input" className="cursor-pointer">
        <div className="relative w-28 h-28">
          {preview ? (
            <img
              src={preview}
              alt="preview"
              className="w-full h-full rounded-full object-cover border-4 border-gray-300"
            />
          ) : (
            <div className="w-full h-full rounded-full bg-gray-300 flex items-center justify-center border-4 border-gray-300"></div>
          )}
          <div className="absolute bottom-0 right-0 bg-black rounded-full w-8 h-8 flex items-center justify-center text-white text-xl">
            +
          </div>
        </div>
      </label>
      <input
        id="avatar-input"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading}
        className="hidden"
      />
    </div>
  );
}
