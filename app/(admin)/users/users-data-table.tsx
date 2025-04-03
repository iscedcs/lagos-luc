"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MoreHorizontal,
  Edit,
  Trash,
  Lock,
  UserCog,
  Mail,
  Eye,
} from "lucide-react";
import { useRouter } from "next/navigation";

// Mock data - in a real app, this would come from a server action
const mockUsers = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    role: "Super Admin",
    status: "Active",
    lastActive: "2023-04-01T10:30:00Z",
    type: "admin",
    properties: 0,
    avatarUrl: "",
  },
  {
    id: "2",
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    role: "Admin",
    status: "Active",
    lastActive: "2023-04-01T09:15:00Z",
    type: "admin",
    properties: 0,
    avatarUrl: "",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    role: "Property Owner",
    status: "Active",
    lastActive: "2023-03-28T14:20:00Z",
    type: "owner",
    properties: 3,
    avatarUrl: "",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    role: "Property Owner",
    status: "Inactive",
    lastActive: "2023-02-15T11:45:00Z",
    type: "owner",
    properties: 1,
    avatarUrl: "",
  },
  {
    id: "5",
    name: "James Wilson",
    email: "james.wilson@example.com",
    role: "Auditor",
    status: "Active",
    lastActive: "2023-03-30T16:10:00Z",
    type: "admin",
    properties: 0,
    avatarUrl: "",
  },
  {
    id: "6",
    name: "Olivia Martinez",
    email: "olivia.martinez@example.com",
    role: "Property Owner",
    status: "Pending",
    lastActive: "2023-04-01T08:30:00Z",
    type: "owner",
    properties: 2,
    avatarUrl: "",
  },
];

interface UsersDataTableProps {
  userType: "all" | "admin" | "owner";
}

export function UsersDataTable({ userType }: UsersDataTableProps) {
  const router = useRouter();
  const [users, setUsers] = useState(
    userType === "all"
      ? mockUsers
      : mockUsers.filter((user) =>
          userType === "admin" ? user.type === "admin" : user.type === "owner"
        )
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "inactive":
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "suspended":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  const handleViewUser = (userId: string) => {
    router.push(`/users/${userId}`);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Active</TableHead>
            {userType !== "admin" && <TableHead>Properties</TableHead>}
            <TableHead className="w-[80px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={userType !== "admin" ? 6 : 5}
                className="h-24 text-center"
              >
                No users found.
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={user.avatarUrl} alt={user.name} />
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {user.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{user.role}</Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(user.status)}>
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>{formatDate(user.lastActive)}</TableCell>
                {userType !== "admin" && (
                  <TableCell>
                    {user.type === "owner" ? user.properties : "-"}
                  </TableCell>
                )}
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => handleViewUser(user.id)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit user
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Mail className="mr-2 h-4 w-4" />
                        Send email
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <UserCog className="mr-2 h-4 w-4" />
                        Manage permissions
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Lock className="mr-2 h-4 w-4" />
                        Reset password
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete user
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
