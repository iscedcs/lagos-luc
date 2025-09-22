import type React from "react";
import AdminSidebar from "./components/admin-sidebar";
import AdminHeader from "./components/admin-header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getUserProfile } from "@/actions/users";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session?.user.id) {
    redirect("/login");
  }
  const user = await getUserProfile();
  return (
    <div className="flex h-svh bg-gray-50">
      <AdminSidebar />
      <ScrollArea className="w-full h-svh ">
        <AdminHeader user={user} />
        <main className="flex-1">{children}</main>
      </ScrollArea>
    </div>
  );
}
