import { SyntheticEvent, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Loading from "@/components/icons/Loading";

export default function Reset() {
  const supabase = useSupabaseClient();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>();
  const [success, setSuccess] = useState(false);

  const [email, setEmail] = useState("");

  const handleResetSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      setIsLoading(false);
      setError(error);
      return;
    }

    setIsLoading(false);
    setSuccess(true);
  };

  return (
    <>
      <Head>
        <title>Reset Password | Next Overflow</title>
      </Head>
      <main className="flex grow flex-col justify-center container max-w-prose mx-auto px-8">
        <form
          className="flex flex-col rounded relative px-4 py-8"
          onSubmit={handleResetSubmit}
        >
          <h1 className="text-4xl text-center mb-8">Reset Password</h1>
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
          <button
            type="submit"
            disabled={isLoading}
            className="bg-frost-0 text-night-0 rounded px-4 py-2 mt-4"
          >
            Reset Password
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
          {success ? (
            <div className="bg-aurora-3/60 border border-aurora-3 rounded text-snow-0 text-center text-sm my-8 p-4">
              Done! If the email address exists in the system, a message will be
              sent with the reset link.
            </div>
          ) : (
            " "
          )}
        </div>
        <div className="text-center">
          <Link
            href="/users/signup"
            className="block text-sm text-snow-0/80 underline"
          >
            Don&apos;t have an account yet? Sign up!
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
