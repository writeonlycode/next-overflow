import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { fetchServerSideQuestionsWithMetadata, useQuestionsWithMetadata } from "@/lib/questions/questions";
import QuestionsIndex from "@/components/questions/QuestionsIndex";
import Navigation from "@/components/pagination/Navigation";
import Loading from "@/components/icons/Loading";

export default function QuestionsIndexPage({ page, limit, questionsFallback }: any) {
  const { data, count, error } = useQuestionsWithMetadata(page, limit, questionsFallback);

  if (error) {
    console.error(error);

    return (
      <main className="flex grow flex-col container max-w-prose mx-auto px-8 mt-8">
        <div className="">
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
            <div className="bg-aurora-0/60 border border-aurora-0 rounded text-snow-0 text-center text-sm my-8 p-4">
              Ops, an error occured.
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="flex grow flex-col container max-w-prose mx-auto px-8 mt-8">
        <div className="">
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
            <div className="flex justify-center my-8 p-4">
              <Loading />
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex grow flex-col container max-w-prose mx-auto px-8 mt-8">
      <div className="">
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
      </div>
      <Navigation
        currentPage={page}
        totalPages={Math.ceil(count / limit)}
      />
    </main>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const page = context?.query?.page ? parseInt(context?.query?.page as string) : 1;
  const limit = context?.query?.limit ? parseInt(context?.query?.limit as string) : 10;

  const questionsFallback = await fetchServerSideQuestionsWithMetadata(context, page, limit);

  return { props: { page, limit, questionsFallback } };
}
