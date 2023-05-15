import { useState } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import Loading from "@/components/icons/Loading";

export default function ButtonSignOut() {
  const supabase = useSupabaseClient();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <button
      className="relative flex w-full items-center justify-center bg-aurora-0 text-snow-2 rounded px-5 py-2"
      onClick={handleSignOut}
      disabled={isLoading}
    >
      {isLoading ? (
        <span className="absolute inset-0 bg-aurora-0 rounded flex items-center justify-center">
          <Loading />
        </span>
      ) : (
        ""
      )}
      <span className="">Sign Out</span>
    </button>
  );
}
