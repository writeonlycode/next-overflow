import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/router";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Loading from "../icons/Loading";

export default function AnswerDelete({ id }: any) {
  const supabase = useSupabaseClient();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from("answers")
        .delete()
        .eq("id", id)
        .select()
        .single();

      if (error) {
        throw error;
      }
    } catch (error: any) {
      setIsLoading(false);
      console.log(error);
    }

    router.reload();
  };

  return (
    <button
      onClick={handleClick}
      className="relative text-sm bg-aurora-0 hover:bg-aurora-0/90 ease-in duration-100 rounded px-2"
      disabled={isLoading}
    >
      {isLoading ? (
        <span className="absolute inset-0 bg-aurora-0 rounded flex items-center justify-center">
          <Loading className="animate-spin w-3 h-3" />
        </span>
      ) : (
        ""
      )}
      <span className="">Delete</span>
    </button>
  );
}
