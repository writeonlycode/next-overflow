import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { fetchServerSideAnswer, useAnswer } from "@/lib/answers/answers";
import AnswerEdit from "@/components/answers/AnswerEdit";

export default function AnswerEditPage({ answer_id, answerFallback }: any) {
  const { data } = useAnswer(answer_id, answerFallback);

  return (
    <>
      <Head>
        <title>Edit Answer | Next Overflow</title>
      </Head>
      <h2 className="text-2xl text-center mb-4">Edit Answer</h2>
      <AnswerEdit answer={data} />
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const supabase = createServerSupabaseClient(context);

  const {
    query: { answer_id },
  } = context;

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

  const answerFallback = await fetchServerSideAnswer(context, answer_id as string);

  if (session.user.id !== answerFallback?.data?.profile_id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { initialSession: session, answer_id, answerFallback },
  };
}
