import { useEffect, useState } from "react";
import Link from "next/link";
import { useUser } from "@supabase/auth-helpers-react";
import IconMenu from "@/components/icons/IconMenu";
import IconClose from "@/components/icons/IconClose";
import SignOut from "@/components/auth/SignOut";
import { signInButton, signUpButton } from "@/components/auth/_shared/buttons";

export default function Menu() {
  const user = useUser();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div id="mobile-menu" className="flex items-center justify-center">
      <button onClick={() => setIsOpen(!isOpen)} className="z-10">
        {isOpen ? <IconClose /> : <IconMenu />}
      </button>
      <div
        onClick={() => setIsOpen(false)}
        className={`absolute inset-0 bg-night-0 transition-all ease-in duration-300 overflow-hidden px-4 ${
          isOpen ? "h-screen py-14" : "h-0"
        }`}
      >
        <div className="flex flex-col max-w-prose mx-auto">
          <div className="flex flex-col gap-4">
            {user ? (
              <>
                <Link href="/users/edit" className="block text-center underline">
                  {user.email}
                </Link>
                <SignOut />
              </>
            ) : (
              <>
                {signInButton}
                {signUpButton}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
