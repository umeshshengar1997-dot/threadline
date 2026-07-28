import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between px-6 py-5 max-w-3xl mx-auto w-full">
        <span className="font-display text-xl tracking-tight">Threadline</span>
        <nav className="flex items-center gap-4 font-mono text-sm">
          <Link href="/login" className="hover:text-indigo focus-ring rounded">
            Log in
          </Link>
          <Link
            href="/signup"
            className="bg-ink text-paper px-4 py-2 rounded-full hover:bg-indigo focus-ring"
          >
            Get your page
          </Link>
        </nav>
      </header>

      <section className="flex-1 flex flex-col items-center justify-center px-6 text-center max-w-2xl mx-auto">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-indigo mb-4">
          No. 001 — one link, every destination
        </p>
        <h1 className="font-display text-5xl sm:text-6xl leading-[1.05] mb-6">
          Everything you make,
          <br />
          on one ticket.
        </h1>
        <p className="text-ink/70 max-w-md mb-10">
          Threadline gives you a single page for every link that matters, and a
          dashboard to edit it whenever your work changes.
        </p>
        <Link
          href="/signup"
          className="bg-indigo text-paper px-6 py-3 rounded-full font-medium hover:bg-indigo-dark focus-ring"
        >
          Claim your page
        </Link>

        <div className="mt-16 w-full max-w-sm bg-white border border-line rounded-2xl p-6 text-left shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-indigo/10 border border-indigo/30" />
            <div>
              <p className="font-display text-lg leading-tight">@yourname</p>
              <p className="text-xs text-ink/50 font-mono">threadline.app/yourname</p>
            </div>
          </div>
          <div className="stub-divider mb-4" style={{ "--stub-color": "#D9D2C2" }} />
          <div className="space-y-2">
            {["My latest project", "Newsletter", "Book a call"].map((t) => (
              <div
                key={t}
                className="border border-line rounded-full px-4 py-2 text-sm font-medium text-center"
              >
                {t}
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="text-center text-xs text-ink/40 py-6 font-mono">
        Built with Threadline
      </footer>
    </main>
  );
}
