import AdminSidebar from "@/components/admin/AdminSidebar";
import { Toaster } from "react-hot-toast";

export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-[#0e0e1b] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Toaster position="top-right" />
      <AdminSidebar />
      <main className="flex-1 p-6 md:p-8 bg-slate-100 dark:bg-[#0e0e1b] text-slate-900 dark:text-slate-100 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}