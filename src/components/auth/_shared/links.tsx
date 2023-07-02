import Link from "next/link";

export const signUpLink = (
  <Link href="/auth/signup" className="block text-sm text-snow-0/80 underline">
    Don&apos;t have an account yet? Sign up!
  </Link>
);

export const signInLink = (
  <Link href="/auth/signin" className="block text-sm text-snow-0/80 underline">
    Already have an account? Sign in!
  </Link>
);

export const resetLink = (
  <Link href="/auth/reset" className="block text-sm text-snow-0/80 underline">
    Forgot your password?
  </Link>
);

