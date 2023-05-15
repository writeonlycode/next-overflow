import Link from "next/link";

export default function QuestionAuthor({ profile }: any) {
  return (
    <div className="flex justify-end ">
      <div className="flex items-center gap-2">
        <img
          src={profile.avatar_url}
          alt="Profile Picture"
          width="48"
          height="48"
          className="inline-block rounded-full bg-snow-2"
        />
        <div className="">
          <Link
            href={`/users/${profile.id}`}
            className="block text-sm font-semibold text-snow-2"
          >
            {profile.display_name}
          </Link>
          <div className="block text-xs text-snow-0">
            {profile.questions_count} questions
            <div className="block text-xs text-snow-0"></div>
            {profile.answers_count} answers
          </div>
        </div>
      </div>
    </div>
  );
}
