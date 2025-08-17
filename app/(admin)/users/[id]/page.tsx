import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserProfileSection } from "./user-profile-section";
import { UserSecuritySection } from "./user-security-section";
import { UserPermissionsSection } from "./user-permissions-section";
import { UserActivitySection } from "./user-activity-section";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, UserCog } from "lucide-react";
import Link from "next/link";
import { getUserById } from "@/actions/users";

export default async function UserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const userData = await getUserById(id);

  if (!userData.success || !userData.user || userData.error) {
    return <div>{userData.error}</div>;
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/users">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {userData.user.firstName} {userData.user.lastName}
            </h1>
            <p className="text-muted-foreground">{userData.user.email}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Mail className="mr-2 h-4 w-4" />
            Send Email
          </Button>
          {userData.user.role !== "hahaagagag" && (
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
          {/* {userData.user.role === "PROPERTY_OWNER" && (
            <TabsTrigger value="properties">Properties</TabsTrigger>
          )} */}
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <UserProfileSection user={userData.user} />
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <UserSecuritySection user={userData.user} />
        </TabsContent>

        <TabsContent value="permissions" className="mt-6">
          <UserPermissionsSection user={userData.user} />
        </TabsContent>

        <TabsContent value="activity" className="mt-6">
          <UserActivitySection userId={userData.user.id} />
        </TabsContent>

        {/* {userData.user.role === "PROPERTY_OWNER" && (
          <TabsContent value="properties" className="mt-6">
            <UserPropertiesSection properties={userData.properties} />
          </TabsContent>
        )} */}
      </Tabs>
    </div>
  );
}
