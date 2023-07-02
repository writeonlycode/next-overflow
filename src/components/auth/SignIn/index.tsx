import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/router";
import { useSignIn } from "@/lib/auth/auth";
import { loadingElement, errorElement, successElement, } from "../_shared/elements";
import { resetLink, signUpLink } from "../_shared/links";

export default function SignIn() {
  const router = useRouter();
  const { trigger, data, error, isMutating } = useSignIn();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignInSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    trigger({ email, password });
  };

  if (error) {
    console.error(error);
  }

  if (data) {
    router.push("/");
  }

  return (
    <>
      <form
        className="flex flex-col rounded relative px-4 py-8"
        onSubmit={handleSignInSubmit}
      >
        <div className="flex flex-col mb-4">
          <label htmlFor="signInEmail" className="text-sm mb-2">
            Email address
          </label>
          <input
            id="signInEmail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            disabled={isMutating}
            className="block text-night-0 border border-night-0 rounded px-4 py-2"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="signInPassword" className="text-sm mb-2">
            Your password
          </label>
          <input
            id="signInPassword"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            disabled={isMutating}
            className="text-night-0 border border-night-0 rounded px-4 py-2"
          />
        </div>
        <button
          type="submit"
          disabled={isMutating}
          className="bg-frost-0 text-night-0 rounded px-4 py-2 mt-4"
        >
          Sign In
        </button>
        {isMutating && loadingElement}
        {error && errorElement}
        {data && successElement}
      </form>
      <div className="text-center">
        {resetLink}
        {signUpLink}
      </div>
    </>
  );
}
