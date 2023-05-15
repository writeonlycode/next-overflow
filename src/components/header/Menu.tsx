import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useUser } from "@supabase/auth-helpers-react";
import IconMenu from "@/components/icons/IconMenu";
import IconClose from "@/components/icons/IconClose";
import ButtonSignUp from "@/components/auth/ButtonSignUp";
import ButtonSignIn from "@/components/auth/ButtonSignIn";
import ButtonSignOut from "@/components/auth/ButtonSingOut";

export default function Menu() {
  const router = useRouter();
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
                <Link
                  href="/users/edit"
                  className="block text-center underline"
                >
                  {user.email}
                </Link>
                <ButtonSignOut />
              </>
            ) : (
              <>
                <ButtonSignIn />
                <ButtonSignUp />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
