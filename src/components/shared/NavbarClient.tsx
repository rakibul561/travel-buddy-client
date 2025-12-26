"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Heart } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import LogoutButton from "./Logout";

const navLinks = [
  { name: "Destinations", href: "/destinations" },
  { name: "Explore Travelers", href: "/explore-travelers" },
  { name: "Stories", href: "/stories" },
  { name: "About", href: "/about" },
];

type Props = {
  isLoggedIn: boolean;
};

export default function NavbarClient({ isLoggedIn }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
      <div className="mx-auto max-w-7xl rounded-full border bg-white/80 backdrop-blur-md shadow-lg px-6 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-yellow-400 text-white font-bold flex items-center justify-center">
            H
          </div>
          <span className="text-xl font-extrabold">
            Hello<span className="text-pink-500">Travel</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="font-semibold text-gray-600 hover:text-pink-500 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button className="hidden md:flex w-10 h-10 items-center justify-center rounded-full bg-orange-50 text-pink-500 hover:bg-pink-500 hover:text-white transition">
            <Heart className="w-5 h-5 fill-current" />
          </button>

          {isLoggedIn ? (
            <LogoutButton />
          ) : (
            <Link href="/login">
              <Button className="text-[#EC4899]">Login</Button>
            </Link>
          )}

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="outline">
                  <Menu />
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-[300px] p-6">
                <SheetTitle className="sr-only">Menu</SheetTitle>

                <nav className="mt-8 flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="text-lg font-semibold"
                    >
                      {link.name}
                    </Link>
                  ))}

                  <div className="border-t pt-4">
                    {isLoggedIn ? (
                      <LogoutButton />
                    ) : (
                      <Link href="/login">
                        <Button className="w-full">Login</Button>
                      </Link>
                    )}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
