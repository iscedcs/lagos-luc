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

export async function getUserProfile() {
  try {
    const userProfileResponse = await axiosRequest(
      lucClient,
      {
        url: `${API_ROUTE.user.profile}`,
        method: "GET",
      },
      true
    );
    const userProfile: UserInterface = userProfileResponse.data.data;
    return userProfile;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.response?.data.message);
      return null;
    } else {
      console.error("Error fetching user profile:", error);
      return null;
    }
  }
}

export async function UpdateUserProfile(formData: FormData) {
  console.log(formData)
  try {
    const userProfileResponse = await axiosRequest(
      lucClient,
      {
        url: `${API_ROUTE.user.profile}`,
        method: "PATCH",
        data: {
          firstName: formData.get("firstName"),
          lastName: formData.get("lastName"),
          phone: formData.get("phone"),
        }
      },
      true
    );
    const userProfile: UserInterface = userProfileResponse.data.data;
    return { user: userProfile };
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.response?.data.message);
      return { error: error.response?.data.message || "Failed to update user profile" };
    } else {
      console.error("Error updating user profile:", error);
      return { error: "Failed to update user profile" };
    }
  }
}