import { useUser } from "@supabase/auth-helpers-react";
import IconHandThumbUp from "@/components/icons/IconHandThumbUp";
import IconHandThumbDown from "@/components/icons/IconHandThumbDown";
import Loading from "@/components/icons/Loading";
import { useUpsertQuestionVote, useDeleteQuestionVote } from "@/lib/questionsVotes/questionsVotes";

export default function QuestionVotes({ question }: any) {
  const user = useUser();
  const vote = question?.current_user_question_vote?.at(0)?.vote;

  const { trigger: triggerUpsert, isMutating: isUpserting } =
    useUpsertQuestionVote(user?.id as string, question.id);
  const { trigger: triggerDelete, isMutating: isDeleting } =
    useDeleteQuestionVote(user?.id as string, question.id);

  const handleUpVote = async () => {
    await triggerUpsert({
      profile_id: user?.id,
      question_id: question?.id,
      vote: true,
    });
  };

  const handleDownVote = async () => {
    await triggerUpsert({
      profile_id: user?.id,
      question_id: question?.id,
      vote: false,
    });
  };

  const handleDeleteVote = async () => {
    await triggerDelete({ profile_id: user?.id, question_id: question.id });
  };

  return (
    <div className="relative flex gap-4">
      <span className="flex items-center gap-2 text-sm text-snow-0">
        <button
          className={vote === true ? "relative text-frost-0" : "relative "}
          onClick={vote === true ? handleDeleteVote : handleUpVote}
          disabled={isUpserting || isDeleting}
        >
          <IconHandThumbUp />
        </button>
        {question.question_votes_up_count}
      </span>
      <span className="flex items-center gap-2 text-sm text-snow-0">
        <button
          className={vote === false ? "text-frost-0" : ""}
          onClick={vote === false ? handleDeleteVote : handleDownVote}
          disabled={isUpserting || isDeleting}
        >
          <IconHandThumbDown />
        </button>
        {question.question_votes_down_count}
      </span>
      {isUpserting || isDeleting ? (
        <div className="absolute inset-0 flex items-center justify-center bg-night-0/40">
          <Loading />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
