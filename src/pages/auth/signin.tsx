import Head from "next/head";
import SignIn from "@/components/auth/SignIn";

export default function SignInPage() {
  return (
    <>
      <Head>
        <title>Sign In | Next Overflow</title>
      </Head>
      <h2 className="text-2xl text-center mb-4">Sign In</h2>
      <SignIn />
    </>
  );
}
