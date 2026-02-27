import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import ProtectedRoute from "@/components/shared/ProtectedRoute";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <SidebarProvider className="text-black font-bold">
        <AppSidebar />

        <SidebarInset className="flex bg-slate-50 text-slate-900 flex-col">
          {/* IMPORTANT: padding + overflow */}
          <main className="flex-1 overflow-y-auto mt-20">
            <div className=" max-w-7xl mx-auto w-full">
              {children}
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
