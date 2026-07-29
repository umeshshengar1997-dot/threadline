"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function completeOnboarding(formData) {
  const username = formData
    .get("username")
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "");
  const bio = formData.get("bio")?.toString() ?? "";
  const avatar_url = formData.get("avatar_url")?.toString() || null;

  if (!username) {
    redirect("/onboarding?error=" + encodeURIComponent("Use letters, numbers, or dashes."));
  }

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const update = { username, bio, username_set: true };
  if (avatar_url) update.avatar_url = avatar_url;

  const { error } = await supabase.from("profiles").update(update).eq("id", user.id);

  if (error) {
    redirect("/onboarding?error=" + encodeURIComponent("That username is already taken."));
  }

  redirect("/dashboard");
}
