import Link from "next/link";

export default function ProfilesIndex({ profiles }: any) {
  return profiles.map((profile: any) => {
    console.log(profile)
    let trimmedAbout = profile.about?.substr(0, 200);
    trimmedAbout = trimmedAbout?.substr(0, Math.min(trimmedAbout.length, trimmedAbout.lastIndexOf(" ")));

    return (
      <article key={profile.id} className=" mb-6">
        <div className="flex items-start bg-night-1 rounded p-4">
          <img
            src={profile.avatar_url}
            alt="Profile Picture"
            width="64"
            height="64"
            className="block rounded-full bg-snow-2 me-4"
          />
          <div className="">
            <h3 className="font-semibold text-lg text-snow-2 mb-2">
              <Link href={`/profiles/${profile.id}`}>{profile.display_name}</Link>
            </h3>
            <div className="text-sm text-snow-2 mb-4">{trimmedAbout}...</div>
          </div>
        </div>
      </article>
    );
  });
}
