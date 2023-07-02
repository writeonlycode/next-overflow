import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import Link from "next/link";
import { fetchServerSideQuestionsWithMetadata, useQuestionsWithMetadata } from "@/lib/questions/questions";
import ErrorPage from "@/components/_shared/ErrorPage";
import LoadingPage from "@/components/_shared/LoadingPage";
import QuestionsIndex from "@/components/questions/QuestionsIndex";
import Navigation from "@/components/pagination/Navigation";

export default function QuestionsIndexPage({ page, limit, questionsFallback }: any) {
  const { data, count, error } = useQuestionsWithMetadata(page, limit, questionsFallback);

  if (error) {
    return <ErrorPage title={"Users | Next Overflow"} error={error} />;
  }

  if (!data) {
    return <LoadingPage title={"Users | Next Overflow"} />;
  }

  return (
    <>
      <Head>
        <title>Questions | Next Overflow</title>
      </Head>
      <div className="flex justify-between mb-8">
        <h2 className="text-3xl">Questions</h2>
        <Link
          href="/questions/new"
          className="border border-frost-0 bg-frost-0 hover:bg-frost-0/90 text-night-0 text-center ease-in duration-100 rounded px-4 py-2"
        >
          Ask Question
        </Link>
      </div>
      <div>
        <QuestionsIndex questions={data} />
      </div>
      <Navigation currentPage={page} totalPages={Math.ceil(count / limit)} />
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const page = context?.query?.page ? parseInt(context?.query?.page as string) : 1;
  const limit = context?.query?.limit ? parseInt(context?.query?.limit as string) : 10;

  const questionsFallback = await fetchServerSideQuestionsWithMetadata(context, page, limit);

  return { props: { page, limit, questionsFallback } };
}
