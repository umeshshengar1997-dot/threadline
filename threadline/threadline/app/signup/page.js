import Link from "next/link";
import { signup } from "./actions";
import GoogleButton from "../login/GoogleButton";

export default function SignupPage({ searchParams }) {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl font-bold mb-2">Threadline</h1>
          <p className="text-gray-600">Join Threadline</p>
          <p className="text-gray-500 text-sm mt-1">Sign up for free!</p>
        </div>

        <form action={signup} className="space-y-4 mb-6">
          <div>
            <input
              name="email"
              type="email"
              required
              placeholder="Email"
              className="w-full border border-gray-300 rounded-full px-6 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <input
              name="password"
              type="password"
              required
              minLength={6}
              placeholder="Password"
              className="w-full border border-gray-300 rounded-full px-6 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {searchParams?.error && (
            <p className="text-red-500 text-sm text-center">{searchParams.error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-gray-300 text-gray-700 rounded-full py-3 font-medium text-sm hover:bg-gray-400 transition"
          >
            Continue
          </button>
        </form>

        <p className="text-xs text-gray-500 text-center mb-8">
          By clicking Create account, you agree to Threadline's{" "}
          <span className="underline">privacy notice</span>, TCs and to receive offers,
          news and updates.
        </p>

        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">OR</span>
          </div>
        </div>

        <GoogleButton />

        <p className="text-sm text-gray-600 text-center mt-8">
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-600 font-medium hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}
