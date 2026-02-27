/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  LogOut,
  User,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, refetch } = useUserInfoQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    refetch();
  }, [pathName, refetch]);

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
  if (pathName.includes("/dashboard")) return null;

  const user = data?.data;

  return (
    <nav className="fixed top-8 left-0 right-0 z-[100] flex justify-center px-4 pointer-events-none">
      <div className="bg-white/70 backdrop-blur-xl border border-white max-w-5xl w-full rounded-2xl shadow-sm px-6 h-16 flex items-center justify-between pointer-events-auto transition-all">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <span className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center">
              <GlobeIcon />
            </div>
            TravelBuddy
          </span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/explore-travelers" className="text-[14px] font-medium text-slate-600 hover:text-blue-500 transition-colors">
            Explore Travelers
          </Link>
          <Link href="/user/dashboard/match-travel" className="text-[14px] font-medium text-slate-600 hover:text-blue-500 transition-colors">
            Find Travel Buddy
          </Link>
          <Link href="/#pricing" className="text-[14px] font-medium text-slate-600 hover:text-blue-500 transition-colors">
            Pricing
          </Link>
        </div>

        {/* Auth Actions */}
        <div className="flex items-center gap-4">
          {!user ? (
            <>
              <Link href="/login" className="hidden sm:block text-[14px] font-medium text-slate-600 hover:text-blue-500 transition-colors">
                Sign In
              </Link>
              <Link href="/register">
                <button className="bg-blue-400 hover:bg-blue-500 text-white py-1.5 px-5 rounded-full text-sm font-semibold transition-colors shadow-sm">
                  Get Started
                </button>
              </Link>
            </>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-9 h-9 rounded-full border border-blue-100 p-0.5 hover:border-blue-400 transition-all overflow-hidden bg-white"
              >
                {user?.profilePicture ? (
                  <img src={user.profilePicture} className="w-full h-full rounded-full object-cover" alt="Profile" />
                ) : (
                  <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center">
                    <User className="w-4 h-4 text-slate-400" />
                  </div>
                )}
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-lg border border-slate-100 p-2 overflow-hidden animate-slide-in-from-top z-50">
                  <div className="px-4 py-3 border-b border-slate-50 mb-1">
                    <p className="text-sm font-bold text-slate-800 truncate">{user.name}</p>
                    <p className="text-[11px] font-semibold text-blue-400 truncate uppercase mt-0.5 tracking-wider">{user.role}</p>
                  </div>
                  <Link href={user.role === 'ADMIN' ? '/admin/dashboard/analytices' : '/user/dashboard/create-travel'} className="flex items-center gap-3 px-4 py-2.5 text-[14px] font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                    <svg className="w-4 h-4 text-slate-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" /><rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" /></svg> Dashboard
                  </Link>
                  <Link href="/profile" className="flex items-center gap-3 px-4 py-2.5 text-[14px] font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                    <User className="w-4 h-4 text-slate-400" /> My Profile
                  </Link>
                  <button
                    onClick={async () => {
                      await logout(undefined).unwrap();
                      dispatch(authApi.util.resetApiState());
                      router.push("/login");
                    }}
                    className="flex items-center gap-3 w-full px-4 py-2.5 text-[14px] font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors mt-1"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              )}
            </div>
          )}

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-slate-600 hover:text-blue-500 transition-colors ml-2">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-4 right-4 bg-white/95 backdrop-blur-xl border border-slate-100 rounded-2xl p-6 space-y-4 shadow-xl pointer-events-auto">
          <Link href="/explore-travelers" className="block text-base font-bold text-slate-800 py-2 border-b border-slate-50">Explore Travelers</Link>
          <Link href="/user/dashboard/match-travel" className="block text-base font-bold text-slate-800 py-2 border-b border-slate-50">Find Travel Buddy</Link>
          <Link href="/#pricing" className="block text-base font-bold text-slate-800 py-2 border-b border-slate-50">Pricing</Link>
          {!user && (
            <div className="pt-4 flex flex-col gap-3">
              <Link href="/login" className="text-center font-bold text-slate-600 py-2.5 border border-slate-200 rounded-xl">Sign In</Link>
              <Link href="/register" className="bg-blue-400 text-white py-2.5 rounded-xl text-center font-bold">Get Started</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

// Simple Globe Icon component placeholder
const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </svg>
);
