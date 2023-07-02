import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/router";
import { useSignUp } from "@/lib/auth/auth";
import { loadingElement, errorElement, successElement, } from "../_shared/elements";
import { resetLink, signInLink } from "../_shared/links";

export default function SingUp() {
  const router = useRouter();
  const { trigger, data, error, isMutating } = useSignUp();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [display_name, setDisplayName] = useState("");
  const [about, setAbout] = useState("");

  const handleSignInSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await trigger({
      email,
      password,
      options: { data: { display_name, about } },
    });
  };

  if (error) {
    console.error(error);
  }

  if (data) {
    router.push(`/users/${data.user.id}`);
  }

  return (
    <>
      <form
        className="flex flex-col rounded relative px-4 py-8"
        onSubmit={handleSignInSubmit}
      >
        <div className="flex flex-col mb-4">
          <label htmlFor="signInDisplayName" className="text-sm mb-2">
            Display Name
          </label>
          <input
            id="signInDisplayName"
            type="text"
            value={display_name}
            onChange={(e) => setDisplayName(e.currentTarget.value)}
            disabled={isMutating}
            className="text-night-0 border border-night-0 rounded px-4 py-2"
          />
        </div>
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
        <div className="flex flex-col mb-4">
          <label htmlFor="signInAbout" className="text-sm mb-2">
            About
          </label>
          <textarea
            id="signInAbout"
            value={about}
            onChange={(e) => setAbout(e.currentTarget.value)}
            disabled={isMutating}
            className="text-night-0 border border-night-0 rounded px-4 py-2"
            rows={10}
          />
        </div>
        <button
          type="submit"
          disabled={isMutating}
          className="bg-frost-0 text-night-0 rounded px-4 py-2 mt-4"
        >
          Sign Up
        </button>
        {isMutating && loadingElement}
        {error && errorElement}
        {data && successElement}
      </form>
      <div className="text-center">
        {resetLink}
        {signInLink}
      </div>
    </>
  );
}
