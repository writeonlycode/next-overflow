import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "@supabase/auth-helpers-react";
import { useInsertAnswer } from "@/lib/answers/answers";
import Loading from "@/components/icons/Loading";

export default function AnswerNew({ question_id }: any) {
  const user = useUser();
  const router = useRouter();

  const { trigger, data, error, isMutating } = useInsertAnswer();

  const [body, setBody] = useState("");

  const handleFormSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await trigger({ body, profile_id: user?.id, question_id: question_id });
  };

  if (!user) {
    router.push("/users/signin");
  }

  if (data) {
    router.push(`/questions/${question_id}`);
  }

  if (error) {
    console.error(error);
  }

  const loadingElement = (
    <div className="absolute inset-0 flex items-center justify-center bg-night-0/50">
      <Loading />
    </div>
  );

  const errorElement = (
    <div className="bg-aurora-0/60 border border-aurora-0 rounded text-snow-0 text-center text-sm my-8 p-4">
      Ops, an error occured.
    </div>
  );

  let successElement = (
    <div className="absolute inset-0 flex items-center justify-center bg-night-0/50">
      <div className="bg-aurora-3/60 border border-aurora-3 rounded text-snow-0 text-center text-sm my-8 p-4">
        Answer posted!
      </div>
    </div>
  );

  return (
    <form
      className="flex flex-col rounded relative"
      onSubmit={handleFormSubmit}
    >
      <div className="flex flex-col mb-4">
        <textarea
          id="about"
          rows={16}
          value={body}
          onChange={(e) => setBody(e.currentTarget.value)}
          className="text-night-0 border border-night-0 rounded px-4 py-2"
          disabled={isMutating || data}
        />
      </div>

      <button
        type="submit"
        disabled={isMutating || data}
        className="bg-frost-0 text-night-0 rounded px-4 py-2 mt-4"
      >
        Post Answer
      </button>
      {isMutating && loadingElement}
      {error && errorElement}
      {data && successElement}
    </form>
  );
}
