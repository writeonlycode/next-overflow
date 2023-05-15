import Link from "next/link";
import QuestionVotes from "@/components/questions/shared/QuestionVotes";
import QuestionAuthor from "@/components/questions/shared/QuestionAuthor";

export default function QuestionCard({ question }: any) {
  let trimmedBody = question.body.substr(0, 200);
  trimmedBody = trimmedBody.substr(0, Math.min(trimmedBody.length, trimmedBody.lastIndexOf(" ")));

  return (
    <article className=" mb-6">
      <div className="bg-night-1 rounded p-4">
        <h3 className="font-semibold text-lg text-snow-2 mb-2">
          <Link href={`/questions/${question.id}`}>
            {question.title}
          </Link>
        </h3>
        <div className="text-sm text-snow-2 mb-4">
          {trimmedBody}...
        </div>
        <div className="flex items-center justify-between">
          <QuestionVotes question={question} />
          <QuestionAuthor profile={question.profile} />
        </div>
      </div>
    </article>
  );
}
