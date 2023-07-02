import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import Link from "next/link";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { fetchServerSideQuestionWithMetadata, useQuestionWithMetadata } from "@/lib/questions/questions";
import ErrorPage from "@/components/_shared/ErrorPage";
import LoadingPage from "@/components/_shared/LoadingPage";
import QuestionsShow from "@/components/questions/QuestionShow";
import { fetchServerSideAnswersWithMetadata, useAnswersWithMetadata } from "@/lib/answers/answers";
import AnswersIndex from "@/components/answers/AnswersIndex";

export default function QuestionPage({ id, questionFallback, answersFallback }: any) {
  const { data: question_data, error: question_error } = useQuestionWithMetadata(id, questionFallback);
  const { data: answers_data, error: answers_error } = useAnswersWithMetadata(
    id,
    undefined,
    undefined,
    answersFallback
  );

  if (question_error) {
    return <ErrorPage title={"Error | Next Overflow"} error={question_error} />;
  }

  if (answers_error) {
    return <ErrorPage title={"Error | Next Overflow"} error={question_error} />;
  }

  if (!question_data) {
    return <LoadingPage title={"Loading Question | Next Overflow"} />;
  }

  if (!answers_data) {
    return <LoadingPage title={"Loading Answers | Next Overflow"} />;
  }

  return (
    <>
      <Head>
        <title>Questions | Next Overflow</title>
      </Head>
      <QuestionsShow question={question_data} />
      <h3 className="text-2xl mb-4">{answers_data.length} Answers</h3>
      <AnswersIndex answers={answers_data} />
      <Link
        href={`/questions/${id}/answers/new`}
        className="block border border-frost-0 bg-frost-0 hover:bg-frost-0/90 text-night-0 text-center ease-in duration-100 rounded px-4 py-2"
      >
        New Answer
      </Link>
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

  const questionFallback = await fetchServerSideQuestionWithMetadata(context, id as string);
  const answersFallback = await fetchServerSideAnswersWithMetadata(context, id as string);

  return { props: { initialSession: session, id, questionFallback, answersFallback } };
}
