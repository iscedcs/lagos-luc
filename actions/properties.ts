"use server";

import { auth } from "@/auth";
import { axiosRequest, lucClient } from "@/axios-client";
import { API_ROUTE, BASE_URL } from "@/lib/const";
import { AxiosError } from "axios";

export async function getAllProperties(limit: number = 10, page: number = 1) {
    const session = await auth();
    if (!session || !session?.access_token) {
        return {
            data: [] as PropertyInterface[],
            meta: {
                total: 0,
                page: 1,
                totalPages: 0,
                limit: 10,
            },
        };
    }

    const url = `${BASE_URL}${API_ROUTE.property.all}?limit=${limit}&page=${page}`;
    try {
        const response = await axiosRequest(
            lucClient,
            {
                url,
                method: "GET",
            },
            true
        );

        const propertyData: PropertyDataInterface = response.data;

        return propertyData;
    } catch (error) {
        if (error instanceof AxiosError) {
            return {
                data: [] as PropertyInterface[],
                meta: {
                    total: 0,
                    page: 1,
                    totalPages: 0,
                    limit: 10,
                },
            };
        } else {
            return {
                data: [] as PropertyInterface[],
                meta: {
                    total: 0,
                    page: 1,
                    totalPages: 0,
                    limit: 10,
                },
            };
        }
    }
}

export async function getPropertyById(id: string) {
    const session = await auth();
    if (!session || !session?.access_token) {
        return null;
    }

    const url = `${BASE_URL}${API_ROUTE.property.one}`.replace("{id}", id);
    try {
        const response = await axiosRequest(
            lucClient,
            {
                url,
                method: "GET",
            },
            true
        );

        if (response.data?.data) {
            return response.data.data;
        }
        return null;
    } catch (error) {
        if (error instanceof AxiosError) {
            // Error handled
        } else {
            // Error handled
        }
        return null;
    }
}

export async function createProperty(propertyData: {
    code?: string;
    address: string;
    lga: string;
    lcda?: string;
    ward: string;
    ownerId: string;
    ownershipType: string;
    zoneId: string;
    propertyType: string;
    propertyUse: string;
    locationClass: string;
    buildingType?: string;
    numberOfUnits?: number;
    buildingHeight?: number;
    coveredArea: number;
    yearBuilt?: number;
    condition: string;
    wallType?: string;
    roofType?: string;
    finishingQuality: string;
    locationWeight: number;
    useWeight: number;
    typeWeight: number;
    buildingFactor: number;
    areaFactor: number;
    estimatedValue: number;
    annualLUC: number;
    waitTime?: number;
    priority?: string;
    status?: string;
}) {
    try {
        const session = await auth();
        if (!session || !session?.access_token) {
            return {
                success: false,
                message: "Unauthorized. Please log in.",
                data: null,
            };
        }

        const url = `${BASE_URL}${API_ROUTE.property.create}`;
        const response = await axiosRequest(
            lucClient,
            {
                url,
                method: "POST",
                data: propertyData,
            },
            true
        );

        if (response.data?.success) {
            return {
                success: true,
                message: response.data.message || "Property created successfully",
                data: response.data.data,
            };
        }

        return {
            success: false,
            message: response.data?.message || "Failed to create property",
            data: null,
        };
    } catch (error) {
        if (error instanceof AxiosError) {
            const errorMessage = error.response?.data?.message || "Error creating property";
            return {
                success: false,
                message: errorMessage,
                data: null,
            };
        } else {
            return {
                success: false,
                message: error instanceof Error ? error.message : "An unexpected error occurred",
                data: null,
            };
        }
    }
}

export async function updateProperty(
    propertyId: string,
    propertyData: Partial<{
        address: string;
        lga: string;
        lcda: string;
        ward: string;
        propertyType: string;
        propertyUse: string;
        locationClass: string;
        buildingType: string;
        numberOfUnits: number;
        buildingHeight: number;
        coveredArea: number;
        yearBuilt: number;
        condition: string;
        wallType: string;
        roofType: string;
        finishingQuality: string;
        locationWeight: number;
        useWeight: number;
        typeWeight: number;
        buildingFactor: number;
        areaFactor: number;
        estimatedValue: number;
        annualLUC: number;
        status: string;
        priority: string;
    }>
) {
    try {
        const session = await auth();
        if (!session || !session?.access_token) {
            return {
                success: false,
                message: "Unauthorized. Please log in.",
                data: null,
            };
        }

        const url = `${BASE_URL}${API_ROUTE.property.update}`.replace("{id}", propertyId);
        const response = await axiosRequest(
            lucClient,
            {
                url,
                method: "PATCH",
                data: propertyData,
            },
            true
        );

        if (response.data?.success) {
            return {
                success: true,
                message: response.data.message || "Property updated successfully",
                data: response.data.data,
            };
        }

        return {
            success: false,
            message: response.data?.message || "Failed to update property",
            data: null,
        };
    } catch (error) {
        if (error instanceof AxiosError) {
            const errorMessage = error.response?.data?.message || "Error updating property";
            return {
                success: false,
                message: errorMessage,
                data: null,
            };
        } else {
            return {
                success: false,
                message: error instanceof Error ? error.message : "An unexpected error occurred",
                data: null,
            };
        }
    }
}
export async function softDeleteProperty(propertyId: string) {
  try {
    const session = await auth();
    if (!session || !session?.access_token) {
      return {
        success: false,
        message: "Unauthorized. Please log in.",
        data: null,
      };
    }

    const url = `${BASE_URL}${API_ROUTE.property.softDelete}`.replace("{id}", propertyId);
    const response = await axiosRequest(
      lucClient,
      {
        url,
        method: "PATCH",
      },
      true
    );

    if (response.data?.success) {
      return {
        success: true,
        message: response.data.message || "Property archived successfully",
        data: response.data.data,
      };
    }

    return {
      success: false,
      message: response.data?.message || "Failed to archive property",
      data: null,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message || "Error archiving property";
      return {
        success: false,
        message: errorMessage,
        data: null,
      };
    } else {
      return {
        success: false,
        message: error instanceof Error ? error.message : "An unexpected error occurred",
        data: null,
      };
    }
  }
}

export async function deleteProperty(propertyId: string) {
  try {
    const session = await auth();
    if (!session || !session?.access_token) {
      return {
        success: false,
        message: "Unauthorized. Please log in.",
        data: null,
      };
    }

    const url = `${BASE_URL}${API_ROUTE.property.delete}`.replace("{id}", propertyId);
    const response = await axiosRequest(
      lucClient,
      {
        url,
        method: "DELETE",
      },
      true
    );

    if (response.data?.success) {
      return {
        success: true,
        message: response.data.message || "Property deleted successfully",
        data: response.data.data,
      };
    }

    return {
      success: false,
      message: response.data?.message || "Failed to delete property",
      data: null,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message || "Error deleting property";
      return {
        success: false,
        message: errorMessage,
        data: null,
      };
    } else {
      return {
        success: false,
        message: error instanceof Error ? error.message : "An unexpected error occurred",
        data: null,
      };
    }
  }
}