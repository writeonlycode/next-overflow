import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import ProfileEdit from "@/components/profiles/ProfileEdit";
import ButtonDelete from "@/components/auth/ButtonDelete";
import {fetchServerSideProfile, useProfile} from "@/lib/profiles/profiles";

export default function UserEditPage({id, profileFallback }: any) {
  const router = useRouter();
  const user = useUser();

  const { data } = useProfile(id, profileFallback);

  if (!user) {
    router.push("/");
  }

  return (
    <>
      <Head>
        <title>Edit Profile | Next Overflow</title>
      </Head>
      <main className="flex grow flex-col justify-center container max-w-prose mx-auto my-4 px-8">
        <div className="">
          <h2 className="text-2xl text-center mb-4">Edit Account Information</h2>
        </div>
        <div className="">
          <h2 className="text-2xl text-center mt-8 mb-4">Edit Profile Information</h2>
          <ProfileEdit profile={data} />
        </div>
        <div className="my-8 px-4">
          <p className="text-aurora-0 mb-4">
            Warning: Deleting your account is an irreversible action and will
            permanently remove all your account information.
          </p>
          <ButtonDelete />
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const supabase = createServerSupabaseClient(context);

  const { query: { id } } = context;
  const { data: { session } } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: "/users/signin",
        permanent: false,
      },
    };

  
  const profileFallback = await fetchServerSideProfile(context, id as string);

  if (session.user.id !== profileFallback?.data?.id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { initialSession: session, id, profileFallback },
  };
}
