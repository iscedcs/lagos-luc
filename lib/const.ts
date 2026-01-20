
export const BASE_URL =
  process.env.BACKEND_URL || "https://land-use-api.onrender.com";
export const API_ROUTE = {
  auth: {
    login: "/api/auth/login",
    reset: "/api/auth/{email}/reset-password",
    registerPropertyOwner: "/api/auth/create",
    loginUser:"/api/auth/login", 
    changeUserPassword:"/api/auth/{email}/reset-password",
    requestEmailVerificationCode:"/api/auth/request-verify-email-code",
    verifyEmailVerificationCode:"/api/auth/verify-email-code",
    resetPasswordWithPhoneNunmber:"/api/auth/reset-password-phone",
    sendResetTokenToPhone:"/api/auth/send-reset-token-phone",
    resetPasswordWithEmail:"/api/auth/reset-password-email",
    SendResetTokenToEmail:"/api/auth/send-reset-token-email",
    SignOutCurrentUser:"/api/auth/signout",
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
  zone: {
    create: "/api/zone/create",
    all: "/api/zone/all",
    search: "/api/zone/search",
    one: "/api/zone/one",
    update: "/api/zone/update",
    delete: "/api/zone/delete",
    stats: "/api/zone/stats"
  },
  property: {
    all: "/api/property/all",
    one: "/api/property/one/{id}",
    create: "/api/property/create",
    update: "/api/property/update/{id}",
    delete: "/api/property/delete/{id}",
    softDelete: "/api/property/soft-delete/{id}",
  },
};

export const ADMIN_ROLES: USER_ROLE[] = ['SUPERADMIN', 'ADMIN']

