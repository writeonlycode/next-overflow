import Loading from "@/components/icons/Loading";
import { useSignOut } from "@/lib/auth/auth";
import { loadingElement } from "../_shared/elements";

export default function SignOut() {
  const { trigger, data, error, isMutating } = useSignOut();

  const handleSignOut = async () => {
    trigger();
  };

  return (
    <button
      className="relative flex w-full items-center justify-center bg-aurora-0 text-snow-2 rounded px-5 py-2"
      onClick={handleSignOut}
      disabled={isMutating}
    >
      <span className="">Sign Out</span>
      {isMutating && loadingElement}
    </button>
  );
}
