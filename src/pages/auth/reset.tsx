import Head from "next/head";
import ResetPassword from "@/components/auth/ResetPassword";

export default function ResetPage() {
  return (
    <>
      <Head>
        <title>Reset Password | Next Overflow</title>
      </Head>
      <h2 className="text-2xl text-center mb-4">Reset Password</h2>
      <ResetPassword />
    </>
  );
}
