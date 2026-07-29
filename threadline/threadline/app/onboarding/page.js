import Link from "next/link";
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

  if (profile?.username_set) redirect("/dashboard");

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm">
        <div className="flex justify-between items-center mb-12">
          <Link href="/" className="text-gray-400 text-sm">
            Back
          </Link>
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          </div>
          <span className="text-gray-400 text-sm">Skip</span>
        </div>

        <div className="text-center mb-10">
          <h1 className="font-bold text-3xl mb-2">Add profile details</h1>
          <p className="text-gray-600 text-sm">
            Add your profile image, name, and bio.
          </p>
        </div>

        <OnboardingForm error={searchParams?.error} />
      </div>
    </main>
  );
}
