import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import ClickableLink from "./ClickableLink";

export default async function PublicProfilePage({ params }) {
  const supabase = createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", params.username)
    .single();

  if (!profile) notFound();

  const { data: links } = await supabase
    .from("links")
    .select("*")
    .eq("user_id", profile.id)
    .eq("is_active", true)
    .order("position", { ascending: true });

  const isDark = profile.theme === "ticket-ink";
  const accent = profile.accent_color || "#5B5FEF";

  return (
    <main
      className={`min-h-screen flex items-center justify-center px-6 py-12 ${
        isDark ? "bg-ink text-paper" : "bg-paper text-ink"
      }`}
    >
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center text-center mb-8">
          {profile.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt={profile.display_name || profile.username}
              className="w-24 h-24 rounded-full object-cover border-3"
              style={{ borderColor: accent }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : null}

          {!profile.avatar_url && (
            <div
              className="w-24 h-24 rounded-full border-3 flex items-center justify-center font-display text-3xl"
              style={{ borderColor: accent }}
            >
              {(profile.display_name || profile.username)[0]?.toUpperCase()}
            </div>
          )}

          <h1 className="font-display text-3xl mt-6 leading-tight">
            {profile.display_name || profile.username}
          </h1>
          <p className="font-mono text-xs opacity-50 mt-1">@{profile.username}</p>
          {profile.bio && (
            <p className="text-sm opacity-70 mt-3 max-w-xs">{profile.bio}</p>
          )}
        </div>

        <div
          className="stub-divider mb-8"
          style={{ "--stub-color": isDark ? "#3A4260" : "#D9D2C2" }}
        />

        <div className="space-y-3">
          {(links ?? []).map((link) => (
            <ClickableLink key={link.id} link={link} accent={accent} isDark={isDark} />
          ))}
          {(!links || links.length === 0) && (
            <p className="text-center text-sm opacity-50 font-mono">
              No links yet.
            </p>
          )}
        </div>

        <p className="text-center text-xs opacity-30 font-mono mt-12">
          Built with Threadline
        </p>
      </div>
    </main>
  );
}
