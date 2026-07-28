import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { logout } from "../login/actions";
import ProfileForm from "./ProfileForm";
import ThemeEditor from "./ThemeEditor";
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
    <main className="min-h-screen max-w-2xl mx-auto px-6 py-10">
      <header className="flex items-center justify-between mb-10">
        <div>
          <p className="font-mono text-xs uppercase tracking-wide text-ink/40">
            Dashboard
          </p>
          <h1 className="font-display text-3xl">
            threadline.app/{profile?.username}
          </h1>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <Link
            href={`/${profile?.username}`}
            target="_blank"
            className="text-indigo font-medium focus-ring"
          >
            View page ↗
          </Link>
          <form action={logout}>
            <button className="text-ink/50 hover:text-ink focus-ring">
              Log out
            </button>
          </form>
        </div>
      </header>

      <section className="mb-10">
        <h2 className="font-mono text-xs uppercase tracking-wide text-ink/40 mb-3">
          Profile
        </h2>
        <ProfileForm profile={profile} />
      </section>

      <div className="stub-divider my-10" style={{ "--stub-color": "#D9D2C2" }} />

      <section className="mb-10">
        <h2 className="font-mono text-xs uppercase tracking-wide text-ink/40 mb-3">
          Theme
        </h2>
        <ThemeEditor profile={profile} />
      </section>

      <div className="stub-divider my-10" style={{ "--stub-color": "#D9D2C2" }} />

      <section>
        <h2 className="font-mono text-xs uppercase tracking-wide text-ink/40 mb-3">
          Links
        </h2>
        <LinkManager links={links ?? []} />
      </section>
    </main>
  );
}
