import AdminSidebar from "@/components/admin/AdminSidebar";
import { Toaster } from "react-hot-toast";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Toaster position="top-right" />
      <AdminSidebar />
      <main className="flex-1 p-8 bg-gray-100">
        {children}
      </main>
    </div>
  );
}