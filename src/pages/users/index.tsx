import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { fetchServerSideProfilesWithMetadata, useProfiles } from "@/lib/profiles/profiles";
import Navigation from "@/components/pagination/Navigation";
import ErrorPage from "@/components/_shared/ErrorPage";
import LoadingPage from "@/components/_shared/LoadingPage";
import UsersIndex from "@/components/users/UsersIndex";

export default function UsersIndexPage({ page, limit, profilesFallback }: any) {
  const { data, count, error } = useProfiles(page, limit, profilesFallback);

  if (error) {
    return <ErrorPage title={"Users | Next Overflow"} error={error} />;
  }

  if (!data) {
    return <LoadingPage title={"Users | Next Overflow"} />;
  }

  return (
    <>
      <Head>
        <title>Users | Next Overflow</title>
      </Head>
      <h2 className="text-3xl text-center mb-8">Users</h2>
      <UsersIndex profiles={data} />
      <Navigation currentPage={page} totalPages={Math.ceil(count / limit)} />
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const page = context?.query?.page ? parseInt(context?.query?.page as string) : 1;
  const limit = context?.query?.limit ? parseInt(context?.query?.limit as string) : 10;

  const profilesFallback = await fetchServerSideProfilesWithMetadata(context, page, limit);

  return { props: { page, limit, profilesFallback } };
}
