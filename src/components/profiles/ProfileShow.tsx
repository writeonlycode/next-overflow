import Link from "next/link";
import IconWebsite from "@/components/icons/IconWebsite";
import IconTwitter from "@/components/icons/IconTwitter";
import IconGitub from "@/components/icons/IconGithub";

export default function UserShow({ profile }: any) {
  return (
    <div className="flex grow flex-col container max-w-prose mx-auto my-4 px-8">
      {profile?.avatar_url && (
        <div className="text-center mb-4">
          <img
            src={profile?.avatar_url}
            alt="Profile Picture"
            width="64"
            height="64"
            className="inline-block rounded-full"
          />
        </div>
      )}
      <h2 className="text-2xl text-center mb-8">{profile?.display_name}</h2>
      <p className="mb-8">{profile?.about}</p>
      <div className="text-sm mb-8">
        {profile?.website && (
          <Link
            href={profile?.website}
            className="block text-center underline mb-1"
          >
            <IconWebsite />
            {profile?.website}
          </Link>
        )}
        {profile?.twitter && (
          <Link
            href={profile?.twitter}
            className="block text-center underline mb-1"
          >
            <IconTwitter />
            {profile?.twitter}
          </Link>
        )}
        {profile?.github && (
          <Link
            href={profile?.github}
            className="block text-center underline mb-1"
          >
            <IconGitub />
            {profile?.github}
          </Link>
        )}
      </div>
    </div>
  );
}
