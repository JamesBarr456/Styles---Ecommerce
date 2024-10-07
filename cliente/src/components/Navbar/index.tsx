import { IconCart } from "./cartButton";
import Link from "next/link";
import { Logo } from "../logo/Logo";
import { Sidebar } from "./sidebar";
import { UserButton } from "./userButton";

const links = [
  {
    url: "home",
    path: "/",
  },
  {
    url: "sneakers",
    path: "/products",
  },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto flex h-16 w-full items-center justify-between px-5">
        {/* Sidebar Section */}

        <Sidebar />

        {/* Logo Section */}
        <Logo />

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {links.map((link, i) => (
            <Link
              key={i}
              href={link.path}
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 capitalize md:text-lg"
              prefetch={false}
            >
              {link.url}
            </Link>
          ))}
        </nav>

        {/* User Actions */}
        <div className="flex items-center">
          <UserButton />
          <IconCart />
        </div>
      </div>
    </header>
  );
}
