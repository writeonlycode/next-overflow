import { SyntheticEvent, useState } from "react";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Loading from "@/components/icons/Loading";
import AnswerNew from "@/components/answers/AnswerNew";

export default function AnswerNewPage({ question_id }: any) {
  return (
    <>
      <Head>
        <title>New Answer | Next Overflow</title>
      </Head>
      <main className="flex grow flex-col justify-center container max-w-prose mx-auto my-4 px-8">
        <h2 className="text-2xl text-center mb-4">Answer a Question</h2>
        <AnswerNew question_id={question_id} />
      </main>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const supabase = createServerSupabaseClient(context);

  const question_id = context.query.id;

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: "/users/signin",
        permanent: false,
      },
    };

  return {
    props: {
      initialSession: session,
      question_id,
    },
  };
}
