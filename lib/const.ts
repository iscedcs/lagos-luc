export const BASE_URL =
  process.env.BACKEND_URL || "https://pre-release-land-biller-4n9mh.ondigitalocean.app";
export const API_ROUTE = {
  auth: {
    login: "/api/auth/login",
    reset: "/api/auth/{email}/reset-password",
  },
  user: {
    all: "/api/user",
  },
};
