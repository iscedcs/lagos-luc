import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UsersDataTable } from "./users-data-table";
import { AddUserButton } from "./add-user-button";
import { UserRoleFilter } from "./user-role-filter";
import { UserStatusFilter } from "./user-status-filter";
import { SearchInput } from "../components/search-input";

export default function UsersManagementPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">
            Manage system users and property owners
          </p>
        </div>
        <AddUserButton />
      </div>

      <Tabs defaultValue="all" className="w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <TabsList>
            <TabsTrigger value="all">All Users</TabsTrigger>
            <TabsTrigger value="admins">Administrators</TabsTrigger>
            <TabsTrigger value="owners">Property Owners</TabsTrigger>
          </TabsList>

          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <SearchInput
              placeholder="Search users..."
              className="w-full sm:w-[250px]"
            />
            <div className="flex gap-2">
              <UserRoleFilter />
              <UserStatusFilter />
            </div>
          </div>
        </div>

        <TabsContent value="all" className="m-0">
          <UsersDataTable userType="all" />
        </TabsContent>

        <TabsContent value="admins" className="m-0">
          <UsersDataTable userType="admin" />
        </TabsContent>

        <TabsContent value="owners" className="m-0">
          <UsersDataTable userType="owner" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
