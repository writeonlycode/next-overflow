import Link from "next/link";

export default function Footer() {
  return (
    <footer className="container text-center mx-auto px-8 py-4">
    <div className="text-sm">
      Copyright © 2023 Next Overflow.
    </div>
    <div className="text-sm">
      All rights reserved.
    </div>
    <div className="text-sm">
      <Link href="https://github.com/writeonlycode/next-overflow" className="underline">
        Next.js Project by Iago Bozza
      </Link>
    </div>
    </footer>
  );
}
