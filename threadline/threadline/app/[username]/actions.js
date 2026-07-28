"use server";

import { createClient } from "@/lib/supabase/server";

export async function recordClick(linkId) {
  const supabase = createClient();
  await supabase.rpc("increment_click", { link_id: linkId });
}
