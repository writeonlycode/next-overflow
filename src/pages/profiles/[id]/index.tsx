import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { fetchServerSideProfile, useProfile } from "@/lib/profiles/profiles";
import Loading from "@/components/icons/Loading";
import ProfileShow from "@/components/profiles/ProfileShow";

export default function ProfilePage({ id, profileFallback }: any) {
  const { data, error } = useProfile(id, profileFallback);

  if (error) {
    console.error(error);

    return (
      <>
        <Head>
          <title>User Profile | Next Overflow</title>
        </Head>
        <main className="flex grow flex-col container max-w-prose mx-auto px-8 mt-8">
          <div className="bg-aurora-0/60 border border-aurora-0 rounded text-snow-0 text-center text-sm my-8 p-4">
            Ops, an error occured.
          </div>
        </main>
      </>
    );
  }

  if (!data) {
    return (
      <>
        <Head>
          <title>User Profile | Next Overflow</title>
        </Head>
        <main className="flex grow flex-col container max-w-prose mx-auto px-8 mt-8">
          <div className="flex justify-center my-8 p-4">
            <Loading />
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>User Profile | Next Overflow</title>
      </Head>
      <main className="flex grow flex-col container max-w-prose mx-auto px-8 mt-8">
        <ProfileShow profile={data} />
      </main>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const supabase = createServerSupabaseClient(context);

  const { query: { id } } = context;
  const { data: { session } } = await supabase.auth.getSession();

  const profileFallback = await fetchServerSideProfile(context, id as string);

  return { props: { initialSession: session, id, profileFallback } };
}
