import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import ErrorPage from "@/components/_shared/ErrorPage";
import LoadingPage from "@/components/_shared/LoadingPage";
import AnswerNew from "@/components/answers/AnswerNew";
import QuestionsShow from "@/components/questions/QuestionShow";
import { fetchServerSideQuestionWithMetadata, useQuestionWithMetadata } from "@/lib/questions/questions";

export default function AnswerNewPage({ question_id, questionFallback }: any) {
  const { data: question_data, error: question_error } = useQuestionWithMetadata(question_id, questionFallback);

  if (question_error) {
    return <ErrorPage title={"Error | Next Overflow"} error={question_error} />;
  }

  if (!question_data) {
    return <LoadingPage title={"Loading Question | Next Overflow"} />;
  }

  return (
    <>
      <Head>
        <title>New Answer | Next Overflow</title>
      </Head>
      <QuestionsShow question={question_data} />
      <h2 className="text-2xl text-center mb-4">Your Answer</h2>
      <AnswerNew question_id={question_id} />
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const supabase = createServerSupabaseClient(context);

  const question_id = context.query.id;

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return { redirect: { destination: "/users/signin", permanent: false } };
  }

  const questionFallback = await fetchServerSideQuestionWithMetadata(context, question_id as string);

  return { props: { initialSession: session, question_id, questionFallback } };
}
