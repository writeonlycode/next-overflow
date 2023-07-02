import { useUser } from "@supabase/auth-helpers-react";
import IconHandThumbUp from "@/components/icons/IconHandThumbUp";
import IconHandThumbDown from "@/components/icons/IconHandThumbDown";
import Loading from "@/components/icons/Loading";
import { useUpsertAnswerVote, useDeleteAnswerVote } from "@/lib/answersVotes/answersVotes";

export default function AnswerVotes({ answer }: any) {
  const user = useUser();
  const vote = answer?.current_user_answer_vote_id && answer?.current_user_answer_vote?.at(0)?.vote;

  const { trigger: triggerUpsert, isMutating: isUpserting } = useUpsertAnswerVote(user?.id as string, answer.id);
  const { trigger: triggerDelete, isMutating: isDeleting } = useDeleteAnswerVote(user?.id as string, answer.id);

  const handleUpVote = async () => {
    await triggerUpsert({
      profile_id: user?.id,
      answer_id: answer?.id,
      vote: true,
    });
  };

  const handleDownVote = async () => {
    await triggerUpsert({
      profile_id: user?.id,
      answer_id: answer?.id,
      vote: false,
    });
  };

  const handleDeleteVote = async () => {
    await triggerDelete({ profile_id: user?.id, answer_id: answer.id });
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
        {answer.answer_votes_up_count}
      </span>
      <span className="flex items-center gap-2 text-sm text-snow-0">
        <button
          className={vote === false ? "text-frost-0" : ""}
          onClick={vote === false ? handleDeleteVote : handleDownVote}
          disabled={isUpserting || isDeleting}
        >
          <IconHandThumbDown />
        </button>
        {answer.answer_votes_down_count}
      </span>
      {(isUpserting || isDeleting) && (
        <div className="absolute inset-0 flex items-center justify-center bg-night-0/40">
          <Loading />
        </div>
      )}
    </div>
  );
}
