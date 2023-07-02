import { SyntheticEvent, useState } from "react";
import { useResetPassword } from "@/lib/auth/auth";
import { loadingElement, errorElement, successElement, } from "../_shared/elements";
import { signUpLink, signInLink } from "../_shared/links";

export default function ResetPassword() {
  const { trigger, data, error, isMutating } = useResetPassword();

  const [email, setEmail] = useState("");

  const handleResetSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    trigger();
  };

  if (error) {
    console.error(error);
  }

  return (
    <>
      <form
        className="flex flex-col rounded relative px-4 py-8"
        onSubmit={handleResetSubmit}
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
        <button
          type="submit"
          disabled={isMutating}
          className="bg-frost-0 text-night-0 rounded px-4 py-2 mt-4"
        >
          Reset Password
        </button>
        {isMutating && loadingElement}
        {error && errorElement}
        {data && successElement}
      </form>
      <div className="px-4">
        {data && (
          <div className="bg-aurora-3/60 border border-aurora-3 rounded text-snow-0 text-center text-sm my-8 p-4">
            Done! If the email address exists in the system, a message will be
            sent with the reset link.
          </div>
        )}
      </div>
      <div className="text-center">
        {signUpLink}
        {signInLink}
      </div>
    </>
  );
}
