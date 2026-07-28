"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function signup(formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const username = formData
    .get("username")
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "");

  if (!username) {
    redirect("/signup?error=" + encodeURIComponent("Choose a username with letters, numbers, or dashes."));
  }

  const supabase = createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error) {
    redirect("/signup?error=" + encodeURIComponent(error.message));
  }

  // The database trigger creates a profile with a random placeholder username;
  // once we have a user id, claim the username they actually asked for.
  if (data.user) {
    const { error: usernameError } = await supabase
      .from("profiles")
      .update({ username })
      .eq("id", data.user.id);

    if (usernameError) {
      redirect("/signup?error=" + encodeURIComponent("That username is already taken. Try another one."));
    }
  }

  redirect("/dashboard");
}
