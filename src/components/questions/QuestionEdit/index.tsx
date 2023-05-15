import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "@supabase/auth-helpers-react";
import { useUpdateQuestion } from "@/lib/questions/questions";
import Loading from "@/components/icons/Loading";

export default function QuestionEdit({ question }: any) {
  const user = useUser();
  const router = useRouter();

  const { trigger, data, error, isMutating } = useUpdateQuestion(question.id);

  const [title, setTitle] = useState(question.title);
  const [body, setBody] = useState(question.body);

  const handleFormSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await trigger({ title, body });
  };

  if (!user) {
    router.push("/users/signin");
  }

  if (data) {
    router.push(`/questions/${data.id}`);
  }

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
    <form
      className="flex flex-col rounded relative px-4 py-4"
      onSubmit={handleFormSubmit}
    >
      <div className="flex flex-col mb-4">
        <label htmlFor="displayName" className="text-sm font-semibold mb-2">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
          disabled={isMutating || data}
          className="text-night-0 border border-night-0 rounded px-4 py-2"
        />
      </div>

      <div className="flex flex-col mb-4">
        <label htmlFor="about" className="text-sm font-semibold mb-2">
          Body
        </label>
        <textarea
          id="about"
          rows={16}
          value={body}
          onChange={(e) => setBody(e.currentTarget.value)}
          disabled={isMutating || data}
          className="text-night-0 border border-night-0 rounded px-4 py-2"
        />
      </div>

      <button
        type="submit"
        disabled={isMutating || data}
        className="bg-frost-0 text-night-0 rounded px-4 py-2 mt-4"
      >
        Update Question
      </button>
      {isMutating && loadingElement}
      {error && errorElement}
      {data && successElement}
    </form>
  );
}
