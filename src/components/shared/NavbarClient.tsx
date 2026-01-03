"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Logo from "../../assets/Logo";
import {
  authApi,
  useLogOutMutation,
  useUserInfoQuery,
} from "../../redux/feature/auth/auth.api";

export default function NavbarClient() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathName = usePathname();
  const [logout] = useLogOutMutation();

  const { data, isLoading, refetch } = useUserInfoQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    refetch();
  }, [pathName, refetch]);

  if (isLoading) return null;

  // Dashboard এ navbar hide
  if (pathName.includes("/dashboard")) return null;

  const user = data?.data;
  const role = user?.role;

  // =====================
  // NAV LINKS BY ROLE
  // =====================

  const loggedOutLinks = [
    { name: "Explore Travelers", href: "/explore-travelers" },
    { name: "Find Travel Buddy", href: "/find-travel-buddy" },
  ];

  const userLinks = [
    { name: "Explore Travelers", href: "/explore-travelers" },
    { name: "My Travel Plans", href: "/travel-plans" },
    { name: "Profile", href: `/profile/${user?._id}` },
    { name: " Dashboard", href: "/user/dashboard" },
  ];

  const adminLinks = [
    { name: "Admin Dashboard", href: "/admin/dashboard" },
    { name: "Manage Users", href: "/admin/users" },
    { name: "Manage Travel Plans", href: "/admin/travel-plans" },
    { name: "Profile", href: `/profile/${user?._id}` },
  ];

  const navLinks =
    role === "ADMIN"
      ? adminLinks
      : role === "USER"
      ? userLinks
      : loggedOutLinks;

  // =====================
  // LOGOUT
  // =====================

  const handleLogout = async () => {
    try {
      await logout(undefined).unwrap();
      dispatch(authApi.util.resetApiState());
      router.push("/login");
      router.refresh();
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 px-4">
      <div className="mx-auto max-w-7xl rounded-full bg-white/70 backdrop-blur-lg shadow-md px-8 py-3 flex items-center justify-between border">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Logo />
          <span className="text-3xl font-bold text-[#00DC33]">Travel</span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative text-gray-600 font-medium transition hover:text-[#00DC33]
              after:absolute after:-bottom-1 after:left-0 after:h-[2px]
              after:w-0 after:bg-[#00DC33] after:transition-all hover:after:w-full"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {user ? (
            <Button
              onClick={handleLogout}
              variant="outline"
              className="rounded-full px-5 border-gray-300 hover:border-red-400 hover:text-red-500"
            >
              Logout
            </Button>
          ) : (
            <>
              <Button asChild variant="ghost" className="rounded-full px-5">
                <Link href="/login">Login</Link>
              </Button>

              <Button
                asChild
                className="rounded-full px-6 bg-[#00DC33] hover:bg-green-600 text-white"
              >
                <Link href="/register">Register</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
