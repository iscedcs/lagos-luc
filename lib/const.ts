import { allAdminUsers, getUserById, UpdateUser } from "@/actions/users";

export const BASE_URL =
  process.env.BACKEND_URL || "https://land-use-api.onrender.com";
export const API_ROUTE = {
  auth: {
    login: "/api/auth/login",
    reset: "/api/auth/{email}/reset-password",
  },
  user: {
    all: "/api/user",
    profile: "/api/user/me",
    getUserById: "/api/user/one/{id}", 
    UpdateUser: "/api/user/update/{id}",
    getAllBlackListedAdmins:"/api/user/admins",
    getAllBlackListedAgents:"/api/user/agents",
    setNewPasswordForUser: "/api/user/set-new-password",
    superadminCreate: "/api/user/superadmin-create",
    adminCreate: "/api/user/admin-create",
    allAdminUsers:"/api/user/allForAdmins"
},
};

export const ADMIN_ROLES: USER_ROLE[] = ['SUPERADMIN', 'ADMIN']

