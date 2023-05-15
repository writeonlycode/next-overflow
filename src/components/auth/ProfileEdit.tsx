import { SyntheticEvent, useState } from "react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Loading from "@/components/icons/Loading";

export default function Edit({ profile }: any) {
  const supabase = useSupabaseClient();
  const user = useUser();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>();

  const [display_name, setDisplayName] = useState(profile?.display_name || "");
  const [avatar_url, setAvatarUrl] = useState(profile?.avatar_url || "");
  const [about, setAbout] = useState(profile?.about || "");
  const [website, setWebsite] = useState(profile?.website || "");
  const [twitter, setTwitter] = useState(profile?.twitter || "");
  const [github, setGithub] = useState(profile?.github || "");

  const handleFormSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          display_name,
          avatar_url,
          about,
          website,
          twitter,
          github,
        })
        .eq("id", user?.id);

      if (error) {
        throw error;
      }
    } catch (error: any) {
      setError(error);
    }

    setIsLoading(false);
  };

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
          disabled={isLoading}
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
          disabled={isLoading}
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
          disabled={isLoading}
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
          disabled={isLoading}
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
          disabled={isLoading}
          className="text-night-0 border border-night-0 rounded px-4 py-2"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="bg-frost-0 text-night-0 rounded px-4 py-2 mt-4"
      >
        Update Profile Information
      </button>
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-night-0/50">
          <Loading />
        </div>
      ) : (
        ""
      )}
      {error ? (
        <div className="bg-aurora-0/60 border border-aurora-0 rounded text-snow-0 text-center text-sm my-8 p-4">
          Ops, an error occured: {error.message}
        </div>
      ) : (
        " "
      )}
    </form>
  );
}
