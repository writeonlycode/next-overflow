import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import QuestionNew from "@/components/questions/QuestionNew";

export default function QuestionNewPage() {
  return (
    <>
      <Head>
        <title>New Question | Next Overflow</title>
      </Head>
      <main className="flex grow flex-col justify-center container max-w-prose mx-auto my-4 px-8">
        <h2 className="text-2xl text-center mb-4">Ask a New Question</h2>
        <QuestionNew />
      </main>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const supabase = createServerSupabaseClient(context);
  const { data: { session } } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: "/users/signin",
        permanent: false,
      },
    };

  return { props: { initialSession: session, } };
}
