import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/router";
import Loading from "@/components/icons/Loading";
import { useUpdateProfile } from "@/lib/profiles/profiles";

export default function ProfileEdit({ profile }: any) {
  const router = useRouter();
  const { trigger, data, error, isMutating } = useUpdateProfile(profile.id);

  const [display_name, setDisplayName] = useState(profile.display_name);
  const [avatar_url, setAvatarUrl] = useState(profile.avatar_url);
  const [about, setAbout] = useState(profile.about);
  const [website, setWebsite] = useState(profile.website);
  const [twitter, setTwitter] = useState(profile.twitter);
  const [github, setGithub] = useState(profile.github);

  const handleFormSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await trigger({
      display_name,
      avatar_url,
      about,
      website,
      twitter,
      github,
    });

    if (!error) {
      router.push(`/users/${profile.id}`);
    }
  };

  if (error) {
    console.error(error);
  }

  const loadingElement = (
    <div className="absolute inset-0 flex items-center justify-center bg-night-0/50">
      <Loading />
    </div>
  );

  let errorElement = (
    <div className="bg-aurora-0/60 border border-aurora-0 rounded text-snow-0 text-center text-sm my-8 p-4">
      Ops, an error occured.
    </div>
  );

  let successElement = (
    <div className="absolute inset-0 flex items-center justify-center bg-night-0/50">
      <div className="bg-aurora-3/60 border border-aurora-3 rounded text-snow-0 text-center text-sm my-8 p-4">
        Update Successful!
      </div>
    </div>
  );

  return (
    <form
      className="flex flex-col rounded relative px-4 py-4"
      onSubmit={handleFormSubmit}
    >
      <div className="flex flex-col mb-4">
        <label htmlFor="displayName" className="text-sm mb-2">
          Display Name
        </label>
        <input
          id="displayName"
          type="text"
          value={display_name}
          onChange={(e) => setDisplayName(e.currentTarget.value)}
          disabled={isMutating || data}
          className="text-night-0 border border-night-0 rounded px-4 py-2"
        />
      </div>

      <div className="flex flex-col mb-4">
        <label htmlFor="avatarUrl" className="text-sm mb-2">
          Avatar URL
        </label>
        <input
          id="avatarUrl"
          type="text"
          value={avatar_url}
          onChange={(e) => setAvatarUrl(e.currentTarget.value)}
          disabled={isMutating || data}
          className="text-night-0 border border-night-0 rounded px-4 py-2"
        />
      </div>

      <div className="flex flex-col mb-4">
        <label htmlFor="about" className="text-sm mb-2">
          About
        </label>
        <textarea
          id="about"
          rows={8}
          value={about}
          onChange={(e) => setAbout(e.currentTarget.value)}
          disabled={isMutating || data}
          className="text-night-0 border border-night-0 rounded px-4 py-2"
        />
      </div>

      <div className="flex flex-col mb-4">
        <label htmlFor="website" className="text-sm mb-2">
          Website
        </label>
        <input
          id="website"
          type="text"
          value={website}
          onChange={(e) => setWebsite(e.currentTarget.value)}
          disabled={isMutating || data}
          className="text-night-0 border border-night-0 rounded px-4 py-2"
        />
      </div>

      <div className="flex flex-col mb-4">
        <label htmlFor="twitter" className="text-sm mb-2">
          Twitter
        </label>
        <input
          id="twitter"
          type="text"
          value={twitter}
          onChange={(e) => setTwitter(e.currentTarget.value)}
          disabled={isMutating || data}
          className="text-night-0 border border-night-0 rounded px-4 py-2"
        />
      </div>

      <div className="flex flex-col mb-4">
        <label htmlFor="github" className="text-sm mb-2">
          GitHub
        </label>
        <input
          id="github"
          type="text"
          value={github}
          onChange={(e) => setGithub(e.currentTarget.value)}
          disabled={isMutating || data}
          className="text-night-0 border border-night-0 rounded px-4 py-2"
        />
      </div>

      <button
        type="submit"
        disabled={isMutating || data}
        className="bg-frost-0 text-night-0 rounded px-4 py-2 mt-4"
      >
        Update Profile Information
      </button>
      {isMutating && loadingElement}
      {error && errorElement}
      {data && successElement}
    </form>
  );
}
