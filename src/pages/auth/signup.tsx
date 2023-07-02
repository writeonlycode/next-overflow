import Head from "next/head";
import SignUp from "@/components/auth/SignUp";

export default function SignUpPage() {
  return (
    <>
      <Head>
        <title>Sign Up | Next Overflow</title>
      </Head>
      <h2 className="text-2xl text-center mb-4">Sign Up</h2>
      <SignUp />
    </>
  );
}
