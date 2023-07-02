import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import Link from "next/link";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

export default function Home() {
  return (
    <>
      <Head>
        <title>Edit User | Next Overflow</title>
      </Head>
      <h1 className="text-center text-4xl font-bold mb-8">
        <span className="text-frost-0">Next</span>Overflow
      </h1>
      <p className="text-center mb-8">
        Next Overflow is a StackOverflow clone that allows users to ask and answer questions on a variety of topics,
        search for existing questions, and upvote/downvote answers.
      </p>
      <Link
        href="/questions"
        className="block border border-frost-0 bg-frost-0 hover:bg-frost-0/90 text-night-0 text-center ease-in duration-100 rounded px-5 py-2 mb-4"
      >
        View Questions
      </Link>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const supabase = createServerSupabaseClient(context);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return {
    props: {
      initialSession: session,
    },
  };
}
