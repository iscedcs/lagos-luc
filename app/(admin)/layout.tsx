import type React from "react";
// Update the import paths to reflect the new structure
import type { Metadata } from "next";
import AdminSidebar from "./components/admin-sidebar";
import AdminHeader from "./components/admin-header";
import { ScrollArea } from "@/components/ui/scroll-area";

export const metadata: Metadata = {
  title: "Admin Dashboard | Lagos Property Map",
  description: "Administrative dashboard for the Lagos Property Map system",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-svh bg-gray-50">
      <AdminSidebar />
      <ScrollArea className="w-full h-svh ">
        <AdminHeader />
        <main className="flex-1">{children}</main>
      </ScrollArea>
    </div>
  );
}
