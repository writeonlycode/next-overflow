import Head from "next/head";

export default function Error({ title, error }: any) {
  console.error(error);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="bg-aurora-0/60 border border-aurora-0 rounded text-snow-0 text-center text-sm my-8 p-4">
        Ops, an error occured.
      </div>
    </>
  );
}
