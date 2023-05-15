import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/router";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Loading from "@/components/icons/Loading";

export default function AnswerNew({ question_id }: any) {
  const supabase = useSupabaseClient();
  const user = useUser();

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>();

  const [body, setBody] = useState("");

  const handleFormSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const { data, error } = await supabase
        .from("answers")
        .insert({
          body,
          profile_id: user?.id,
          question_id,
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      router.push(`/questions/${question_id}`);
    } catch (error: any) {
      setError(error);
      setIsLoading(false);
    }
  };

  if (!user) {
    return <></>;
  }

  return (
    <form
      className="flex flex-col rounded relative px-4 py-4"
      onSubmit={handleFormSubmit}
    >
      <div className="flex flex-col mb-4">
        <label htmlFor="about" className="text-sm font-semibold mb-2">
          Body
        </label>
        <textarea
          id="about"
          rows={16}
          value={body}
          onChange={(e) => setBody(e.currentTarget.value)}
          className="text-night-0 border border-night-0 rounded px-4 py-2"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="bg-frost-0 text-night-0 rounded px-4 py-2 mt-4"
      >
        Post Answer
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
        " "
      )}
    </form>
  );
}
