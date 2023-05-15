import { useState } from "react";
import { useRouter } from "next/router";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Loading from "@/components/icons/Loading";

export default function ButtonDelete() {
  const router = useRouter();
  const supabase = useSupabaseClient();

  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    const { error } = await supabase.rpc("delete_user");

    if (error) {
      console.log(error);
      setIsLoading(false);
    }

    router.push("/");
  };

  return (
    <button
      className="relative flex w-full items-center justify-center bg-aurora-0 text-snow-2 rounded px-5 py-2"
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <span className="absolute inset-0 bg-aurora-0 rounded flex items-center justify-center">
          <Loading />
        </span>
      ) : (
        ""
      )}
      <span className="">Delete Account</span>
    </button>
  );
}
