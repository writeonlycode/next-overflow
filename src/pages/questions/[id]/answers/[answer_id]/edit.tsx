import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import AnswerEdit from "@/components/answers/AnswerEdit";

export default function AnswerEditPage({ answer }: any) {
  const user = useUser();
  const router = useRouter();

  if (!user) {
    router.push("/");
  }

  return (
    <>
      <Head>
        <title>Edit Question | Next Overflow</title>
      </Head>
      <main className="flex grow flex-col justify-center container max-w-prose mx-auto my-4 px-8">
        <h2 className="text-2xl text-center mb-4">Ask a New Question</h2>
        <AnswerEdit answer={answer} />
      </main>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const supabase = createServerSupabaseClient(context);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return {
      redirect: {
        destination: "/users/signin",
        permanent: false,
      },
    };
  }

  const { data, error } = await supabase
    .from("answers")
    .select("*", {})
    .eq("id", context.query.answer_id)
    .single();

  if (error) {
    console.error(error);

    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  if (session.user.id !== data.profile_id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      initialSession: session,
      answer: data,
    },
  };
}
