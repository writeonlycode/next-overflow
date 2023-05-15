import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/router";
import {
  fetchServerSideQuestionsWithMetadataSearch,
  useQuestionsWithMetadataSearch,
} from "@/lib/questions/questions";
import SearchResults from "@/components/questions/QuestionsSearch/SearchResults";
import SearchForm from "@/components/questions/QuestionsSearch/SearchForm";

export default function SearchPage({ questionsSearchFallback }: any) {
  const { query } = useRouter();
  const { data, error, isLoading } = useQuestionsWithMetadataSearch(
    query.query as string,
    questionsSearchFallback
  );

  if (error) {
    console.error(error);
  }

  const errorElement = (
    <div className="bg-aurora-0/60 border border-aurora-0 rounded text-snow-0 text-center text-sm my-8 p-4">
      Ops, an error occured.
    </div>
  );

  return (
    <>
      <Head>
        <title>Search | Next Overflow</title>
      </Head>
      <main className="flex grow flex-col container max-w-prose mx-auto px-8 mt-8">
        <h2 className="text-3xl text-center mb-8">Search</h2>
        <SearchForm query={query.query} />
        {error && errorElement}
        {data && <SearchResults questions={data} />}
      </main>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const supabase = createServerSupabaseClient(context);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const questionsSearchFallback =
    await fetchServerSideQuestionsWithMetadataSearch(
      context,
      context?.query?.query as string
    );

  return {
    props: {
      initialSession: session,
      questionsSearchFallback,
    },
  };
}
