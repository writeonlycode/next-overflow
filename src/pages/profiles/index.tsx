import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { fetchServerSideProfiles, useProfiles } from "@/lib/profiles/profiles";
import ProfilesIndex from "@/components/profiles/ProfilesIndex";
import Navigation from "@/components/pagination/Navigation";
import Loading from "@/components/icons/Loading";

export default function QuestionsIndexPage({
  page,
  limit,
  profilesFallback,
}: any) {
  const { data, count, error } = useProfiles(page, limit, profilesFallback);

  if (error) {
    console.error(error);

    return (
      <>
        <Head>
          <title>Profiles | Next Overflow</title>
        </Head>
        <main className="flex grow flex-col container max-w-prose mx-auto px-8 mt-8">
          <div className="bg-aurora-0/60 border border-aurora-0 rounded text-snow-0 text-center text-sm my-8 p-4">
            Ops, an error occured.
          </div>
        </main>
      </>
    );
  }

  if (!data) {
    return (
      <>
        <Head>
          <title>Profiles | Next Overflow</title>
        </Head>
        <main className="flex grow flex-col container max-w-prose mx-auto px-8 mt-8">
          <div className="flex justify-center my-8 p-4">
            <Loading />
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Profiles | Next Overflow</title>
      </Head>
      <main className="flex grow flex-col container max-w-prose mx-auto px-8 mt-8">
        <div className="">
          <div className="flex mb-8">
            <h2 className="text-3xl">Profiles</h2>
          </div>
          <div>
            <ProfilesIndex profiles={data} />
          </div>
        </div>
        <Navigation currentPage={page} totalPages={Math.ceil(count / limit)} />
      </main>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const page = context?.query?.page
    ? parseInt(context?.query?.page as string)
    : 1;
  const limit = context?.query?.limit
    ? parseInt(context?.query?.limit as string)
    : 10;

  const profilesFallback = await fetchServerSideProfiles(context, page, limit);

  return { props: { page, limit, profilesFallback } };
}
