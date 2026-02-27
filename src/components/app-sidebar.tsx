"use client";

import {
  BookOpen,
  Home,
  MapPin,
  Settings,
  Users
} from "lucide-react";
import * as React from "react";

import Logo from "@/assets/Logo";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useUserInfoQuery } from "@/redux/feature/auth/auth.api";
import Link from "next/link";

// Admin Navigation Items
const adminNavItems = [
  {
    title: "OverView",
    url: "/admin/dashboard/analytices",
    icon: Home,
    isActive: true,
  },
  {
    title: "User-Managments",
    url: "/admin/dashboard/allUser",
    icon: Home,
    isActive: true,
  },
  {
    title: "Travel-Managment",
    url: "/admin/dashboard/travels",
    icon: Users,
  },
  {
    title: "Payment-Managment",
    url: "/admin/dashboard/payment-managment",
    icon: Users,
  },
];

// User Navigation Items
const userNavItems = [
  {
    title: "Create-Travel",
    url: "/user/dashboard/create-travel",
    icon: Home,
    isActive: true,
  },

  {
    title: "Match-Travel",
    url: "/user/dashboard/match-travel",
    icon: MapPin,
  },

  {
    title: "My-travel",
    url: "/user/dashboard/my-travels",
    icon: Settings,
  },
  {
    title: "Review",
    url: "/user/dashboard/reviews",
    icon: BookOpen,
  },

  {
    title: "Join Requests",
    url: "/user/dashboard/join-request",
    icon: Users,
  },
  {
    title: "Subscription",
    url: "/user/dashboard/subscription",
    icon: Settings,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data } = useUserInfoQuery(undefined);

  const user = {
    name: data?.data?.name || "User",
    email: data?.data?.email || "user@example.com",
    avatar: data?.data?.profilePhoto || "/avatars/default.jpg",
    role: data?.data?.role || "USER",
  };

  // Role based navigation
  const navItems = user.role === "ADMIN" ? adminNavItems : userNavItems;

  return (
    <Sidebar collapsible="icon" {...props}>
      {/* Header with Logo */}
      <SidebarHeader className="border-b border-sidebar-border">
        <Link href="/" className="flex items-center gap-2 px-4 py-4">
          <Logo />
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-2xl font-bold text-[#00DC33]">Travel</span>
            <span className="text-xs text-muted-foreground">
              {user.role === "ADMIN" ? "Admin Panel" : "Your Journey"}
            </span>
          </div>
        </Link>
      </SidebarHeader>

      {/* Main Navigation */}
      <SidebarContent className="px-4 py-8">
        <NavMain items={navItems} />
      </SidebarContent>

      {/* Footer with User Info */}
      <SidebarFooter className="border-t border-sidebar-border">
        <NavUser user={user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
