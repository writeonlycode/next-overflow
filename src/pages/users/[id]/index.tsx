import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { fetchServerSideProfile, useProfile } from "@/lib/profiles/profiles";
import ErrorPage from "@/components/_shared/ErrorPage";
import LoadingPage from "@/components/_shared/LoadingPage";
import UserShow from "@/components/users/UserShow";

export default function ProfilePage({ id, profileFallback }: any) {
  const { data, error } = useProfile(id, profileFallback);

  if (error) {
    return <ErrorPage title={"User Profile | Next Overflow"} error={error} />;
  }

  if (!data) {
    return <LoadingPage title={"User Profile | Next Overflow"} />;
  }

  return (
    <>
      <Head>
        <title>User Profile | Next Overflow</title>
      </Head>
      <UserShow profile={data} />
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const supabase = createServerSupabaseClient(context);

  const {
    query: { id },
  } = context;
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const profileFallback = await fetchServerSideProfile(context, id as string);

  return { props: { initialSession: session, id, profileFallback } };
}
