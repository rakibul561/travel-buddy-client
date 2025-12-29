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

const baseNavLinks = [
  { name: "Destinations", href: "/destinations" },
  { name: "Explore Travelers", href: "/explore-travelers" },
  { name: "Stories", href: "/stories" },
  { name: "About", href: "/about" },
];

export default function NavbarClient() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathName = usePathname();
  const [logout] = useLogOutMutation();

  // refetchOnMountOrArgChange এবং refetch add করা হয়েছে
  const { data, isLoading, refetch } = useUserInfoQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  // pathname change হলে user info refetch করুন
  useEffect(() => {
    refetch();
  }, [pathName, refetch]);

  if (isLoading) {
    return null;
  }

  const userRole = data?.data?.role;

  // Dashboard page এ navbar hide করুন
  if (pathName.includes("/dashboard")) {
    return <div></div>;
  }

  // User role এর উপর ভিত্তি করে nav links build করুন
  const getNavLinks = () => {
    const links = [...baseNavLinks];

    if (userRole === "ADMIN") {
      links.push({ name: "Dashboard", href: "/dashboard" });
    } else if (userRole === "USER") {
      links.push({ name: "Dashboard", href: "/user/dashboard" });
    }

    return links;
  };

  const handleLogout = async () => {
    try {
      await logout(undefined).unwrap();
      dispatch(authApi.util.resetApiState());

      // Logout এর পরে login page এ redirect করুন
      router.push("/login");
      router.refresh();
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const navLinks = getNavLinks();

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 px-4">
      <div className="mx-auto max-w-7xl rounded-full bg-white/70 backdrop-blur-lg shadow-md px-8 py-3 flex items-center justify-between border">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Logo />
          <span className="text-3xl font-bold text-[#00DC33]">Travel</span>
        </Link>

        {/* Desktop Nav Links */}
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

        {/* Actions */}
        <div className="flex items-center gap-3">
          {data?.data?.email ? (
            <Button
              onClick={handleLogout}
              variant="outline"
              className="rounded-full px-5 border-gray-300 hover:border-red-400 hover:text-red-500"
            >
              Logout
            </Button>
          ) : (
            <Button
              asChild
              className="rounded-full px-6 bg-[#00DC33] hover:bg-green-600 text-white"
            >
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
