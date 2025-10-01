"use server";

import { auth } from "@/auth";
import { axiosRequest, lucClient } from "@/axios-client";
import { API_ROUTE } from "@/lib/const";
import { AxiosError } from "axios";

export async function getAllUsers() {
  const session = await auth();
  if (!session || !session?.access_token) {
    return {
      users: [] as UserInterface[],
      count: 0,
        pagination: {
          limit: 10,
          offset: 0,
        },
    }
  }

  const url = session.user.role === "SUPERADMIN" ? API_ROUTE.user.allAdminUsers : API_ROUTE.user.all;
  try {
    const allUsersResponse = await axiosRequest(
      lucClient,
      {
        url,
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

export async function getUserById(userId: string) {         
  try {
    const userResponse = await axiosRequest(
      lucClient,
      {
        url: `${API_ROUTE.user.getUserById.replace("{id}", userId)}`,
        method: "GET",
      },
      true
    );
    const user: UserInterface = userResponse.data.data;
    return user;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.response?.data.message);
      return null;
    } else {
      console.error("Error fetching user by ID:", error);
      return null;
    } 
  }
}

export async function UpdateUser (formData: FormData, userId: string) {
  try {
    const userResponse = await axiosRequest(
      lucClient,
      {
        url: `${API_ROUTE.user.UpdateUser.replace("{id}", userId)}`,
        method: "PATCH",
        data: {
          firstName: formData.get("firstName"), 
          lastName: formData.get("lastName"),
          phone: formData.get("phone"),
          role: formData.get("role"),
          isActive: formData.get("isActive") === "true",
        }
      },  
      true
    );
    const user: UserInterface = userResponse.data.data;
    return { user };
  }
  catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.response?.data.message);
      return { error: error.response?.data.message || "Failed to update user" };
    } else {
      console.error("Error updating user:", error);
      return { error: "Failed to update user" };
    } 
} 
}

export async function getAllBlackListedAdmins() {
  try {
    const allUsersResponse = await axiosRequest(
      lucClient,
      {
        url: API_ROUTE.user.getAllBlackListedAdmins,
        method: "GET",
      },
      true
    );  
    const userData: UserDataInterface = allUsersResponse.data.data;

    return userData;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.response?.data.message);
      return null;
    } else {
      console.error("Error fetching all blacklisted admins:", error);
      return null;
    }
  }
}

export async function getAllBlackListedAgents() {
  try {
    const allUsersResponse = await axiosRequest(
      lucClient,
     {
        url: API_ROUTE.user.getAllBlackListedAgents,
        method: "GET",
      }, 
      true
    );
    const userData: UserDataInterface = allUsersResponse.data.data;

    return userData;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.response?.data.message);
      return null;
    } else {
      console.error("Error fetching all blacklisted agents:", error);
      return null;
    }
  }
}

export async function softDeleteUser(userId: string) {
  try {
    const response = await axiosRequest(
      lucClient,
      {
        url: `${API_ROUTE.user.UpdateUser.replace("{id}", userId)}`,
        method: "PATCH",
      },
      true
    );
    console.log(response.data)
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.response?.data.message);
      return { error: error.response?.data.message || "Failed to delete user" };
    } else {
      console.error("Error deleting user:", error);
      return { error: "Failed to delete user" };
    }   
  }
}

export async function setNewPasswordForUser(formData: FormData, userId: string) {
  try {
    const newPassword = formData.get("newPassword");
    const confirmNewPassword = formData.get("confirmNewPassword");

    if (newPassword !== confirmNewPassword) {
      return { error: "Passwords do not match" };
    }

    const response = await axiosRequest(
      lucClient,
      {
        url: `${API_ROUTE.user.setNewPasswordForUser.replace("{id}", userId)}`,
        method: "PATCH",
        data: {
          newPassword,
        },
      },
      true
    );

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.response?.data.message);
      return { error: error.response?.data.message || "Failed to set new password" };
    } else {
      console.error("Error setting new password:", error);
      return { error: "Failed to set new password" };
    }
  }
}

export async function CreateUser(formData: FormData, role: string) {
  if (!role && !["SUPERADMIN", "ADMIN"].includes(role)) {
    return { error: "You do not have permission to create this user." };
  }
  const url = role === "SUPERADMIN" ? API_ROUTE.user.superadminCreate : API_ROUTE.user.adminCreate;
  try {
     const response = await axiosRequest(
      lucClient,
      {
        url,
        method: "POST",
        data: {
          firstName: formData.get("firstName"),
          lastName: formData.get("lastName"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          role: formData.get("role"),
          password: formData.get("password"),
          gender: formData.get("gender"),
          nin: formData.get("nin"),
          zoneId: formData.get("zoneId")
        },
      },
      true
    );
    const user: UserInterface = response.data.data;
    return { user };
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.response?.data);
      return { error: error.response?.data.message || "Failed to create user" };
    } else {
      console.error("Error creating user:", error);
      return { error: "Failed to create user" };
    }
  }
} 

export async function allAdminUsers() {
  try {
    const allUsersResponse = await axiosRequest(
      lucClient,
      {
        url: API_ROUTE.user.allAdminUsers,
        method: "GET",
      },
      true
    );
    const userData: UserDataInterface = allUsersResponse.data.data;

    return userData;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.response?.data.message);
      return null;
    } else {
      console.error("Error fetching all users:", error);
      return null;
    } 
  }
} 