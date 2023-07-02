import Link from "next/link";

        // <img
        //   src={profile.avatar_url}
        //   alt="Profile Picture"
        //   width="32"
        //   height="32"
        //   className="inline-block rounded-full bg-snow-2"
        // />

export default function AnswerAuthor({ profile }: any) {
  return (
    <div className="flex justify-end ">
      <div className="flex items-center gap-2">
        <div className="">
          <Link
            href={`/profiles/${profile.id}`}
            className="block text-sm font-semibold text-snow-2"
          >
            {profile.display_name}
          </Link>
          <div className="block text-xs text-snow-0">
            <span className="mr-2">
              {profile.questions_count} asked
            </span>
            <span className="">
              {profile.answers_count} answered
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
