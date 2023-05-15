import { useUser } from "@supabase/auth-helpers-react";
import IconChevronDown from "../icons/IconChevronDown";
import IconChevronUp from "../icons/IconChevronUp";
import ProfileCard from "../profiles/ProfileCard";
import Link from "next/link";
import AnswerDelete from "./AnswerDelete";
import AnswerVote from "../answers_votes/AnswerVote";

export default function AnswerCard({ answer }: any) {
  const user = useUser();

  return (
    <article className="relative mb-6">
      <AnswerVote answer_id={answer.id} answers_votes={answer.answers_votes} />
      <div className="bg-night-1 rounded text-snow-2 p-4">
        <div
          className="markdown mb-4"
          dangerouslySetInnerHTML={{ __html: answer.body }}
        />
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {answer.profile_id === user?.id ? (
              <>
                <AnswerDelete id={answer.id} />
                <Link
                  href={`/questions/${answer.question_id}/answers/${answer.id}/edit`}
                  className="text-sm border border-aurora-1 hover:bg-aurora-1 text-aurora-1 hover:text-snow-2 ease-in duration-100 rounded px-2"
                >
                  Edit
                </Link>
              </>
            ) : (
              ""
            )}
          </div>
          <ProfileCard
            profile={{
              ...answer.author,
              questions_count: answer.author.questions[0].count,
            }}
          />
        </div>
      </div>
    </article>
  );
}
