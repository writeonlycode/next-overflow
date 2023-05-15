import Link from "next/link";
import Menu from "@/components/header/Menu";
import IconSearch from "@/components/icons/IconSearch";

export default function Header() {
  return (
    <nav className="sticky top-0 bg-night-0 w-full mx-auto flex justify-between items-center p-4 z-10">
      <div className="flex items-center text-xl font-bold z-10">
        <Link href="/questions">
          <span className="text-frost-0">Next</span>Overflow
        </Link>
      </div>
      <div className="flex grow gap-4 justify-end">
        <Link href="/search" className="z-10">
          <IconSearch />
        </Link>
        <Menu />
      </div>
    </nav>
  );
}
