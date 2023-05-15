import { SyntheticEvent, useState } from "react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Loading from "@/components/icons/Loading";

export default function AccountEdit() {
  const supabase = useSupabaseClient();
  const user = useUser();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>();

  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");

  const handleFormSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        email,
        password,
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      setError(error as Error);
    }

    setIsLoading(false);
  };

  return (
    <>
      <form
        className="flex flex-col rounded relative px-4 py-4"
        onSubmit={handleFormSubmit}
      >
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
          Update Account Information
        </button>
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-night-0/50">
            <Loading />
          </div>
        ) : (
          ""
        )}
        {error ? (
          <div className="bg-aurora-0/60 border border-aurora-0 rounded text-snow-0 text-center text-sm my-8 p-4">
            Ops, an error occured: {error.message}
          </div>
        ) : (
          ""
        )}
      </form>
    </>
  );
}
