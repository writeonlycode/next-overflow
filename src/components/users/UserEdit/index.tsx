import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/router";
import Loading from "@/components/icons/Loading";
import { useUpdateUser } from "@/lib/auth/auth";
import { useUser } from "@supabase/auth-helpers-react";

export default function UserEdit() {
  const router = useRouter();
  const user = useUser();
  const { trigger, data, error, isMutating } = useUpdateUser();

  const [email, setEmail] = useState(user?.email);
  const [password, setPassword] = useState<string | undefined>();

  const handleFormSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await trigger({
      email,
      password,
    });

    if (!error) {
      router.push(`/users/${user?.id}`);
    }
  };

  if (error) {
    console.error(error);
  }

  const loadingElement = (
    <div className="absolute inset-0 flex items-center justify-center bg-night-0/50">
      <Loading />
    </div>
  );

  let errorElement = (
    <div className="bg-aurora-0/60 border border-aurora-0 rounded text-snow-0 text-center text-sm my-8 p-4">
      Ops, an error occured.
    </div>
  );

  let successElement = (
    <div className="absolute inset-0 flex items-center justify-center bg-night-0/50">
      <div className="bg-aurora-3/60 border border-aurora-3 rounded text-snow-0 text-center text-sm my-8 p-4">
        Update Successful!
      </div>
    </div>
  );

  return (
    <form className="flex flex-col rounded relative px-4 py-4" onSubmit={handleFormSubmit}>
      <div className="flex flex-col mb-4">
        <label htmlFor="email" className="text-sm mb-2">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          disabled={isMutating || data}
          className="text-night-0 border border-night-0 rounded px-4 py-2"
        />
      </div>

      <div className="flex flex-col mb-4">
        <label htmlFor="password" className="text-sm mb-2">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          disabled={isMutating || data}
          className="text-night-0 border border-night-0 rounded px-4 py-2"
        />
      </div>

      <button type="submit" disabled={isMutating || data} className="bg-frost-0 text-night-0 rounded px-4 py-2 mt-4">
        Update Profile Information
      </button>
      {isMutating && loadingElement}
      {error && errorElement}
      {data && successElement}
    </form>
  );
}
