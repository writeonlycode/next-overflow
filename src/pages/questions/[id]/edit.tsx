import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { fetchServerSideQuestion, useQuestion } from "@/lib/questions/questions";
import QuestionEdit from "@/components/questions/QuestionEdit";

export default function QuestionEditPage({ id, questionFallback }: any) {
  const { data } = useQuestion(id, questionFallback);

  return (
  <>
      <Head>
        <title>Edit Question | Next Overflow</title>
      </Head>
      <main className="flex grow flex-col justify-center container max-w-prose mx-auto my-4 px-8">
        <h2 className="text-2xl text-center mb-4">Ask a New Question</h2>
        <QuestionEdit question={data} />
      </main>
  </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const supabase = createServerSupabaseClient(context);

  const { query: { id } } = context;
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return {
      redirect: {
        destination: "/users/signin",
        permanent: false,
      },
    };
  }

  const questionFallback = await fetchServerSideQuestion(context, id as string);

  if (session.user.id !== questionFallback?.data?.profile_id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { initialSession: session, id, questionFallback },
  };
}
