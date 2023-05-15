import { SyntheticEvent, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Loading from "@/components/icons/Loading";

export default function SignIn() {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const user = useUser();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignInSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setIsLoading(false);
      setError(error);
      return;
    }

    if (data) {
      router.push("/");
    }
  };

  if (user) {
    router.push("/");
  }

  return (
    <>
      <Head>
        <title>Sign Up | Next Overflow</title>
      </Head>
      <main className="flex grow flex-col justify-center container max-w-prose mx-auto px-8">
        <form
          className="flex flex-col rounded relative px-4 py-8"
          onSubmit={handleSignInSubmit}
        >
          <h1 className="text-4xl text-center mb-8">Sign Up</h1>
          <div className="flex flex-col mb-4">
            <label htmlFor="signInEmail" className="text-sm mb-2">
              Email address
            </label>
            <input
              id="signInEmail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              disabled={isLoading}
              className="block text-night-0 border border-night-0 rounded px-4 py-2"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="signInPassword" className="text-sm mb-2">
              Your password
            </label>
            <input
              id="signInPassword"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              disabled={isLoading}
              className="text-night-0 border border-night-0 rounded px-4 py-2"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-frost-0 text-night-0 rounded px-4 py-2 mt-4"
          >
            Sign Up
          </button>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-night-0/50">
              <Loading />
            </div>
          ) : (
            ""
          )}
        </form>
        <div className="px-4">
          {error ? (
            <div className="bg-aurora-0/60 border border-aurora-0 rounded text-snow-0 text-center text-sm my-8 p-4">
              Ops, an error occured: {error.message}
            </div>
          ) : (
            " "
          )}
        </div>
        <div className="text-center">
          <Link
            href="/users/reset"
            className="block text-sm text-snow-0/80 underline"
          >
            Forgot your password?
          </Link>
          <Link
            href="/users/signin"
            className="block text-sm text-snow-0/80 underline"
          >
            Already have an account? Sign in!
          </Link>
        </div>
      </main>
    </>
  );
}
