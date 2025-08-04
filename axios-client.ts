// axiosClients.ts
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { auth } from "./auth";
import { BASE_URL } from "./lib/const";

// export const eventClient = axios.create({
//   baseURL: EVENT_BASE_URL,
//   timeout: 7000,
// });

// export const authClient = axios.create({
//   baseURL: AUTH_BASE_URL,
//   timeout: 7000,
// });

export const lucClient = axios.create({
  baseURL: BASE_URL,
  timeout: 7000,
});

export const axiosRequest = async (
  client: AxiosInstance,
  config: AxiosRequestConfig,
  requireAuth: boolean = false
) => {
  const finalConfig = { ...config };

  if (requireAuth) {
    const session = await auth();
    if (!session?.access_token) {
      throw new Error("No access token found in session.");
    }

    finalConfig.headers = {
      ...(finalConfig.headers || {}),
      Authorization: `Bearer ${session.access_token}`,
    };
  }

  return client.request(finalConfig);
};

// example usage in a service file

// export const fetchProtectedData = async () => {
//   const response = await requestWithOptionalAuth(
//     dataClient,
//     {
//       url: '/user/data',
//       method: 'GET',
//     },
//     true // ← requires auth
//   );

//   return response.data;
// };

// export const fetchPublicData = async () => {
//   const response = await requestWithOptionalAuth(
//     dataClient,
//     {
//       url: '/public/data',
//       method: 'GET',
// data: {
//           eventId,
//           eventName: event.data.title,
//           userId,
//           image: user.data.displayPicture,
//           name: `${user.data.firstName ?? "Anonymous"} ${
//             user.data.lastName ?? "User"
//           }`,
//           email: user.data.email,
//           phone: user.data.phone,
//           ticketId,
//           displayPicture: user.data.displayPicture,
//           thankyouMail: true,
//         },
//     },
//     false // ← no auth needed
//   );

//   return response.data;
// };
