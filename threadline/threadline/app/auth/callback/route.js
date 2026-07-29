import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  const supabase = createClient();

  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("username_set")
      .eq("id", user.id)
      .single();

    // If they haven't picked a username yet, send them to onboarding
    if (!profile?.username_set) {
      return NextResponse.redirect(`${origin}/onboarding`);
    }
  }

  // Otherwise, they're all set — go to dashboard
  return NextResponse.redirect(`${origin}/dashboard`);
}
