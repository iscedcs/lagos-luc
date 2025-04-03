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

// Mock function to get user data - in a real app, this would be a server action
async function getUserData(id: string) {
  // This is mock data - in a real app, you would fetch this from your database
  const users = [
    {
      id: "1",
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      role: "Super Admin",
      status: "Active",
      lastActive: "2023-04-01T10:30:00Z",
      type: "admin",
      phone: "+1 (555) 123-4567",
      department: "IT Administration",
      joinDate: "2022-01-15T00:00:00Z",
      avatarUrl: "",
      properties: [],
    },
    {
      id: "3",
      name: "Michael Brown",
      email: "michael.brown@example.com",
      role: "Property Owner",
      status: "Active",
      lastActive: "2023-03-28T14:20:00Z",
      type: "owner",
      phone: "+1 (555) 987-6543",
      department: "",
      joinDate: "2022-06-10T00:00:00Z",
      avatarUrl: "",
      properties: [
        {
          id: "prop-1",
          address: "123 Main Street, Lagos",
          type: "Residential",
          status: "Verified",
          value: 450000,
        },
        {
          id: "prop-2",
          address: "456 Oak Avenue, Lagos",
          type: "Commercial",
          status: "Pending Verification",
          value: 780000,
        },
        {
          id: "prop-3",
          address: "789 Pine Road, Lagos",
          type: "Residential",
          status: "Verified",
          value: 320000,
        },
      ],
    },
  ];

  const user = users.find((user) => user.id === id);

  if (!user) {
    return null;
  }

  return user;
}

export default async function UserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const userData = await getUserData(id);

  if (!userData) {
    notFound();
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
              {userData.name}
            </h1>
            <p className="text-muted-foreground">{userData.email}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Mail className="mr-2 h-4 w-4" />
            Send Email
          </Button>
          {userData.type === "admin" && (
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
          {userData.type === "owner" && (
            <TabsTrigger value="properties">Properties</TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <UserProfileSection user={userData} />
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <UserSecuritySection user={userData} />
        </TabsContent>

        <TabsContent value="permissions" className="mt-6">
          <UserPermissionsSection user={userData} />
        </TabsContent>

        <TabsContent value="activity" className="mt-6">
          <UserActivitySection userId={userData.id} />
        </TabsContent>

        {userData.type === "owner" && (
          <TabsContent value="properties" className="mt-6">
            <UserPropertiesSection properties={userData.properties} />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
