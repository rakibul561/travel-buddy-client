import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider className="text-black font-bold">
      <AppSidebar />

      <SidebarInset className="flex bg-[#FFF9F0] text-black flex-col">
        {/* IMPORTANT: padding + overflow */}
        <main className="flex-1 overflow-y-auto mt-20">
          <div className=" max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
