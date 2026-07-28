import Link from "next/link";
import { login } from "./actions";
import GoogleButton from "./GoogleButton";

export default function LoginPage({ searchParams }) {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <Link href="/" className="font-display text-lg">
          Threadline
        </Link>
        <h1 className="font-display text-3xl mt-6 mb-8">Welcome back</h1>

        <GoogleButton />
        <div className="flex items-center gap-3 my-5">
          <div className="h-px flex-1 bg-line" />
          <span className="text-xs text-ink/40 font-mono">or</span>
          <div className="h-px flex-1 bg-line" />
        </div>

        <form action={login} className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wide mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              className="w-full border border-line rounded-lg px-3 py-2 bg-white focus-ring"
            />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-wide mb-1">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              className="w-full border border-line rounded-lg px-3 py-2 bg-white focus-ring"
            />
          </div>

          {searchParams?.error && (
            <p className="text-rose text-sm">{searchParams.error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-indigo text-paper rounded-full py-2.5 font-medium hover:bg-indigo-dark focus-ring"
          >
            Log in
          </button>
        </form>

        <p className="text-sm text-ink/60 mt-6">
          No page yet?{" "}
          <Link href="/signup" className="text-indigo font-medium">
            Create one
          </Link>
        </p>
      </div>
    </main>
  );
}
