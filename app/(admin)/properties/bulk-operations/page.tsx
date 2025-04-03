import type { Metadata } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BulkImportForm from "./bulk-import-form";
import BulkUpdateForm from "./bulk-update-form";
import BulkVerificationForm from "./bulk-verification-form";
import BulkNotificationForm from "./bulk-notification-form";

export const metadata: Metadata = {
  title: "Bulk Operations | Lagos Property Management",
  description:
    "Manage properties in bulk with import, update, verification, and notification tools.",
};

export default function BulkOperationsPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Bulk Operations</h1>
        <p className="text-muted-foreground mt-2">
          Perform operations on multiple properties at once to save time and
          improve efficiency.
        </p>
      </div>

      <Tabs defaultValue="import" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="import">Import</TabsTrigger>
          <TabsTrigger value="update">Update</TabsTrigger>
          <TabsTrigger value="verification">Verification</TabsTrigger>
          <TabsTrigger value="notification">Notification</TabsTrigger>
        </TabsList>
        <TabsContent value="import" className="mt-6">
          <BulkImportForm />
        </TabsContent>
        <TabsContent value="update" className="mt-6">
          <BulkUpdateForm />
        </TabsContent>
        <TabsContent value="verification" className="mt-6">
          <BulkVerificationForm />
        </TabsContent>
        <TabsContent value="notification" className="mt-6">
          <BulkNotificationForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
