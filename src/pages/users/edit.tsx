import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import { fetchServerSideProfile, useProfile } from "@/lib/profiles/profiles";
import ErrorPage from "@/components/_shared/ErrorPage";
import LoadingPage from "@/components/_shared/LoadingPage";
import ProfileEdit from "@/components/users/ProfileEdit";
import UserEdit from "@/components/users/UserEdit";

export default function UserEditPage({ id, profileFallback }: any) {
  const router = useRouter();
  const user = useUser();

  const { data, error } = useProfile(id, profileFallback);

  if (error) {
    return <ErrorPage title={"User Profile | Next Overflow"} error={error} />;
  }

  if (!data) {
    return <LoadingPage title={"User Profile | Next Overflow"} />;
  }

  if (!user) {
    router.push("/");
    return <LoadingPage title={"User Profile | Next Overflow"} />;
  }

  return (
    <>
      <Head>
        <title>Edit User | Next Overflow</title>
      </Head>
      <h2 className="text-2xl text-center mb-4">Edit User Information</h2>
      <UserEdit />
      <h2 className="text-2xl text-center mt-8 mb-4">Edit Profile Information</h2>
      <ProfileEdit profile={data} />
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const supabase = createServerSupabaseClient(context);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };

  const profileFallback = await fetchServerSideProfile(context, session.user.id as string);

  return {
    props: { initialSession: session, profileFallback },
  };
}
