import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import OnboardingForm from "./OnboardingForm";

export default async function OnboardingPage({ searchParams }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("username_set")
    .eq("id", user.id)
    .single();

  // Already completed onboarding — go straight to dashboard
  if (profile?.username_set) redirect("/dashboard");

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-3xl mb-2">Complete your profile</h1>
        <p className="text-ink/60 text-sm mb-8">
          Set up your link-in-bio page with a username, bio, and avatar.
        </p>

        <OnboardingForm error={searchParams?.error} />
      </div>
    </main>
  );
}
