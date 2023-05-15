import Link from "next/link";

export default function ButtonSignIn() {
  return (
    <Link
      href="/users/signin"
      className="block lg:inline-block border border-frost-0 bg-frost-0 hover:bg-frost-0/90 text-night-0 text-center ease-in duration-100 rounded px-5 py-2"
    >
      Sign In
    </Link>
  );
}
