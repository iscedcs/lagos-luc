import { notFound } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserProfileSection } from "./user-profile-section";
import { UserSecuritySection } from "./user-security-section";
import { UserPermissionsSection } from "./user-permissions-section";
import { UserActivitySection } from "./user-activity-section";
import { UserPropertiesSection } from "./user-properties-section";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, UserCog } from "lucide-react";
import Link from "next/link";
import { getUserById } from "@/actions/users";
import { ADMIN_ROLES } from "@/lib/const";

export default async function UserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const user = await getUserById(id);

  if (!user) {
    notFound();
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/users">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Mail className="mr-2 h-4 w-4" />
            Send Email
          </Button>
          {ADMIN_ROLES.includes(user.role as USER_ROLE) && (
            <Button>
              <UserCog className="mr-2 h-4 w-4" />
              Edit Permissions
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 lg:w-auto">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          {user.role === "PROPERTY_OWNER" && (
            <TabsTrigger value="properties">Properties</TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <UserProfileSection user={user} />
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <UserSecuritySection user={user} />
        </TabsContent>

        <TabsContent value="permissions" className="mt-6">
          <UserPermissionsSection user={user} />
        </TabsContent>

        <TabsContent value="activity" className="mt-6">
          <UserActivitySection userId={user.id} />
        </TabsContent>

        {user.role === "PROPERTY_OWNER" && (
          <TabsContent value="properties" className="mt-6">
            <UserPropertiesSection properties={[]} />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
