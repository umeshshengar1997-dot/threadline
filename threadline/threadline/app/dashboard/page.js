import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { logout } from "../login/actions";
import ProfileForm from "./ProfileForm";
import LinkManager from "./LinkManager";

export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const { data: links } = await supabase
    .from("links")
    .select("*")
    .eq("user_id", user.id)
    .order("position", { ascending: true });

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase text-gray-500 tracking-wide">Dashboard</p>
            <h1 className="text-2xl font-bold">threadline.app/{profile?.username}</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href={`/${profile?.username}`}
              target="_blank"
              className="text-indigo-600 text-sm font-medium hover:underline"
            >
              View page :arrow_upper_right:
            </Link>
            <form action={logout}>
              <button className="text-gray-600 text-sm hover:text-gray-900">
                Log out
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <section className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
          <h2 className="text-lg font-bold mb-6">Profile</h2>
          <ProfileForm profile={profile} />
        </section>

        <section className="bg-white rounded-lg border border-gray-200 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold">Links</h2>
            <button className="text-indigo-600 text-sm font-medium hover:underline">
              + Add
            </button>
          </div>
          <LinkManager links={links ?? []} />
        </section>
      </div>
    </main>
  );
}
