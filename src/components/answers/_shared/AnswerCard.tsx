import Link from "next/link";
import AnswerAuthor from "@/components/answers/_shared/AnswerAuthor";
import AnswerVotes from "./AnswerVotes";

export default function AnswerCard({ answer }: any) {
  return (
    <article className="relative mb-6">
      <div className="bg-night-1 rounded text-snow-2 p-4">
        <div className="markdown mb-4" dangerouslySetInnerHTML={{ __html: answer.body }} />
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
          <AnswerVotes answer={answer} />
          <Link
            href={`/questions/${answer.question_id}/answers/${answer.id}/edit`}
            className="text-sm border border-aurora-1 hover:bg-aurora-1 text-aurora-1 hover:text-snow-2 ease-in duration-100 rounded px-2"
          >
            Edit
          </Link>
          </div>
          <AnswerAuthor profile={answer.profile} />
        </div>
      </div>
    </article>
  );
}
