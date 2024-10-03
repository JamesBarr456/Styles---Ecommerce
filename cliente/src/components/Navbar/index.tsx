/**
 * v0 by Vercel.
 * @see https://v0.dev/t/obus3LxsAfo
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import { CircleUserRound, Menu, ShoppingCart } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Button } from "../ui/button";
import Link from "next/link";
import { Logo } from "../logo/Logo";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white ">
      <div className="container mx-auto flex h-16 max-w-6xl  items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full md:hidden"
              >
                <Menu className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="md:hidden bg-white">
              <div className="grid gap-4 p-4">
                <Link
                  href="#"
                  className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  prefetch={false}
                >
                  Home
                </Link>
                <Link
                  href="#"
                  className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  prefetch={false}
                >
                  About
                </Link>
                <Link
                  href="#"
                  className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  prefetch={false}
                >
                  Services
                </Link>
                <Link
                  href="#"
                  className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  prefetch={false}
                >
                  Contact
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <Logo />
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link
            href="#"
            className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            prefetch={false}
          >
            Home
          </Link>
          <Link
            href="#"
            className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            prefetch={false}
          >
            About
          </Link>
          <Link
            href="#"
            className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            prefetch={false}
          >
            Services
          </Link>
          <Link
            href="#"
            className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            prefetch={false}
          >
            Contact
          </Link>
        </nav>
        <div className="flex items-center">
          <Button
            variant="ghost"
            className=" rounded-full p-2  h-10 hover:bg-orange-50 hover:text-orange-500"
          >
            <CircleUserRound />
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className=" rounded-full p-2  h-10 hover:bg-orange-50 hover:text-orange-500"
              >
                <ShoppingCart />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="md:hidden bg-white"
            ></SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
