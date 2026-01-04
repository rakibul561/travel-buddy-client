/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { LayoutDashboard, LogOut, MapPin, Menu, Shield, User, UserCircle } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { data, isLoading, refetch } = useUserInfoQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    refetch();
  }, [pathName, refetch]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    { name: "Dashboard", href: "/user/dashboard" },
  ];

  const adminLinks = [
    { name: "Admin Dashboard", href: "/admin/dashboard" },
    { name: "Manage Users", href: "/admin/dashboard/allUser" },
    { name: "Manage Travel Plans", href: "/admin/dashboard/travels" },
  ];

  const navLinks =
    role === "ADMIN"
      ? adminLinks
      : role === "USER"
      ? userLinks
      : loggedOutLinks;

  // Dropdown menu links with icons
  const dropdownLinks = user
    ? [
        {
          name: "Dashboard",
          href: role === "ADMIN" ? "/admin/dashboard" : "/user/dashboard",
          icon: LayoutDashboard,
        },
        { name: "My Profile", href: "/profile", icon: UserCircle },
        ...(role === "USER"
          ? [{ name: "My Travel Plans", href: "/travel-plans", icon: MapPin }]
          : []),
        ...(role === "ADMIN"
          ? [
              {
                name: "Manage Users",
                href: "/admin/dashboard/allUser",
                icon: Shield,
              },
            ]
          : []),
      ]
    : [];

  // =====================
  // LOGOUT
  // =====================

  const handleLogout = async () => {
    try {
      await logout(undefined).unwrap();
      dispatch(authApi.util.resetApiState());
      setIsDropdownOpen(false);
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

        {/* Nav Links - Desktop */}
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
            <div className="flex items-center gap-3">
              {/* Mobile/Tablet Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 p-2 rounded-full border-2 border-gray-300 hover:border-[#00DC33] transition-all hover:shadow-md"
                >
                  <Menu className="w-5 h-5 text-gray-600" />
                  {user?.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover border-2 border-white"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00DC33] to-green-600 flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  )}
                </button>

                {/* Dropdown Menu - Updated Design */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    {/* User Info Header with Gradient */}
                    <div className="bg-gradient-to-br from-[#00DC33] to-green-600 px-6 py-4 text-white">
                      <div className="flex items-center gap-3 mb-2">
                        {user?.profilePicture ? (
                          <img
                            src={user.profilePicture}
                            alt={user.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                            <User className="w-6 h-6 text-white" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-base font-bold truncate">
                            {user?.name || "User"}
                          </p>
                          <p className="text-xs text-white/80 truncate">
                            {user?.email}
                          </p>
                        </div>
                      </div>
                      <span className="inline-flex items-center px-3 py-1 text-xs font-semibold bg-white/20 backdrop-blur text-white rounded-full">
                        {role === "ADMIN" ? "👑 Admin" : "✈️ Traveler"}
                      </span>
                    </div>

                    {/* Dropdown Links */}
                    <div className="py-2">
                      {dropdownLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                          <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsDropdownOpen(false)}
                            className="flex items-center gap-3 px-6 py-3 text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-[#00DC33] transition-all group"
                          >
                            <Icon className="w-5 h-5 text-gray-400 group-hover:text-[#00DC33] transition-colors" />
                            <span>{link.name}</span>
                          </Link>
                        );
                      })}
                    </div>

                    {/* Logout Button */}
                    <div className="border-t border-gray-100 p-2">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-6 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-all group"
                      >
                        <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
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
