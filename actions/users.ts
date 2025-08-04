"use server";

import { axiosRequest, lucClient } from "@/axios-client";
import { API_ROUTE } from "@/lib/const";
import { AxiosError } from "axios";

export async function getAllUsers() {
  try {
    const allUsersResponse = await axiosRequest(
      lucClient,
      {
        url: API_ROUTE.user.all,
        method: "GET",
      },
      true
    );

    const userData: UserDataInterface = allUsersResponse.data.data;

    return userData;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.response?.data.message);
      return {
        users: [] as UserInterface[],
        count: 0,
        pagination: {
          limit: 10,
          offset: 0,
        },
      };
    } else {
      console.error("Error fetching all users:", error);
      return {
        users: [] as UserInterface[],
        count: 0,
        pagination: {
          limit: 10,
          offset: 0,
        },
      };
    }
  }
}
