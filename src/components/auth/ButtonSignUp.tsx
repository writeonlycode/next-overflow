import Link from "next/link";

export default function ButtonSignUp() {
  return (
    <Link
      href="/users/signup"
      className="block lg:inline-block border border-frost-0 hover:bg-frost-0/90 text-frost-0 hover:text-night-0 text-center ease-in duration-100 rounded px-5 py-2"
    >
      Sign Up
    </Link>
  );
}
