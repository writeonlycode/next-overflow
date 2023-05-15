import Link from "next/link";
import { useUser } from "@supabase/auth-helpers-react";
import QuestionDelete from "@/components/questions/QuestionDelete";
import QuestionAuthor from "@/components/questions/shared/QuestionAuthor";

export default function QuestionFooter({ question }: any) {
  const user = useUser();

  if (!user || user.id !== question.profile_id) {
    return (
      <div className="flex items-center justify-end">
        <QuestionAuthor profile={question.profile} />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-2">
        <Link
          href={`/questions/${question.id}/edit`}
          className="text-sm border border-aurora-1 hover:bg-aurora-1 text-aurora-1 hover:text-snow-2 ease-in duration-100 rounded px-2"
        >
          Edit
        </Link>
        <QuestionDelete id={question.id} />
      </div>
      <QuestionAuthor profile={question.profile} />
    </div>
  );
}
