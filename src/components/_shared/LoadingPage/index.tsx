import Head from "next/head";
import Loading from "@/components/icons/Loading";

export default function LoadingPage({ title }: any) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="flex justify-center my-8 p-4">
        <Loading />
      </div>
    </>
  );
}
