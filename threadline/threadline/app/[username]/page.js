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

  const accentColor = profile.accent_color || "#6366f1";

  return (
    <main
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{
        background: `linear-gradient(180deg, ${accentColor}20 0%, ${accentColor}10 50%, white 100%)`,
      }}
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          {profile.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt={profile.display_name || profile.username}
              className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4"
              style={{ borderColor: accentColor }}
            />
          ) : (
            <div
              className="w-24 h-24 rounded-full mx-auto mb-4 border-4 flex items-center justify-center text-4xl font-bold text-white"
              style={{ backgroundColor: accentColor }}
            >
              {(profile.display_name || profile.username)[0]?.toUpperCase()}
            </div>
          )}

          <h1 className="text-2xl font-bold mb-1">
            {profile.display_name || profile.username}
          </h1>
          <p className="text-gray-600 text-sm mb-3">@{profile.username}</p>
          {profile.bio && (
            <p className="text-gray-700 text-sm max-w-xs mx-auto">{profile.bio}</p>
          )}
        </div>

        <div className="space-y-3 mb-8">
          {(links ?? []).length > 0 ? (
            links.map((link) => (
              <ClickableLink
                key={link.id}
                link={link}
                accentColor={accentColor}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 text-sm py-8">
              No links yet.
            </p>
          )}
        </div>

        <div className="text-center">
          <a
            href="#"
            className="text-gray-500 text-xs"
            style={{ color: accentColor }}
          >
            Join {profile.username} on Threadline
          </a>
        </div>

        <p className="text-center text-gray-400 text-xs mt-12">
          Built with Threadline
        </p>
      </div>
    </main>
  );
}
