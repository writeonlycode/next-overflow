import { GetServerSidePropsContext } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { fetchServerSideQuestionWithMetadata, useQuestionWithMetadata } from "@/lib/questions/questions";
import QuestionsShow from "@/components/questions/QuestionShow";
import Loading from "@/components/icons/Loading";

export default function QuestionPage({ id, questionFallback }: any) {
  const { data, error } = useQuestionWithMetadata(id, questionFallback);

  if (error) {
    console.error(error);

    return (
      <main className="flex grow flex-col container max-w-prose mx-auto px-8 mt-8">
        <div className="bg-aurora-0/60 border border-aurora-0 rounded text-snow-0 text-center text-sm my-8 p-4">
          Ops, an error occured.
        </div>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="flex grow flex-col container max-w-prose mx-auto px-8 mt-8">
        <div className="flex justify-center my-8 p-4">
          <Loading />
        </div>
      </main>
    );
  }

  return (
    <main className="flex grow flex-col container max-w-prose mx-auto px-8 mt-8">
      <QuestionsShow question={data} />
    </main>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const supabase = createServerSupabaseClient(context);

  const { query: { id }, } = context;
  const { data: { session }, } = await supabase.auth.getSession();

  const questionFallback = await fetchServerSideQuestionWithMetadata(context, id as string);

  return { props: { initialSession: session, id, questionFallback } };
}
