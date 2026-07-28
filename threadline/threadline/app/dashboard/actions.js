"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

async function requireUser(supabase) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");
  return user;
}

export async function updateProfile(formData) {
  const supabase = createClient();
  const user = await requireUser(supabase);

  const display_name = formData.get("display_name");
  const bio = formData.get("bio");
  const avatar_url = formData.get("avatar_url");

  await supabase
    .from("profiles")
    .update({ display_name, bio, avatar_url })
    .eq("id", user.id);

  revalidatePath("/dashboard");
}

export async function updateTheme(theme, accent_color) {
  const supabase = createClient();
  const user = await requireUser(supabase);

  await supabase
    .from("profiles")
    .update({ theme, accent_color })
    .eq("id", user.id);

  revalidatePath("/dashboard");
}

export async function addLink(formData) {
  const supabase = createClient();
  const user = await requireUser(supabase);

  const title = formData.get("title");
  const url = formData.get("url");

  const { count } = await supabase
    .from("links")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id);

  await supabase.from("links").insert({
    user_id: user.id,
    title,
    url,
    position: count ?? 0,
  });

  revalidatePath("/dashboard");
}

export async function updateLink(id, fields) {
  const supabase = createClient();
  const user = await requireUser(supabase);

  await supabase.from("links").update(fields).eq("id", id).eq("user_id", user.id);
  revalidatePath("/dashboard");
}

export async function deleteLink(id) {
  const supabase = createClient();
  const user = await requireUser(supabase);

  await supabase.from("links").delete().eq("id", id).eq("user_id", user.id);
  revalidatePath("/dashboard");
}

export async function moveLink(id, direction, links) {
  const supabase = createClient();
  const user = await requireUser(supabase);

  const index = links.findIndex((l) => l.id === id);
  const swapWith = direction === "up" ? index - 1 : index + 1;
  if (swapWith < 0 || swapWith >= links.length) return;

  const a = links[index];
  const b = links[swapWith];

  await supabase.from("links").update({ position: b.position }).eq("id", a.id).eq("user_id", user.id);
  await supabase.from("links").update({ position: a.position }).eq("id", b.id).eq("user_id", user.id);

  revalidatePath("/dashboard");
}
