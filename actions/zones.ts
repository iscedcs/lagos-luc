"use server";

import { axiosRequest, lucClient } from "@/axios-client";
import { API_ROUTE } from "@/lib/const";
import { AxiosError } from "axios";

export async function getAllZones() {
  try {
    const allZonesResponse = await axiosRequest(
      lucClient,
      {
        url: API_ROUTE.zone.all,
        method: "GET",
      },
      true
    );

    const zoneData: ZoneDataInterface = allZonesResponse.data.data;

    return zoneData;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.response?.data.message);
      return {
        zones: [] as ZoneInterface[],
        count: 0,
        pagination: {
          limit: 10,
          offset: 0,
        },
      };
    } else {
      console.error("Error fetching all zones:", error);
      return {
        zones: [] as ZoneInterface[],
        count: 0,
        pagination: {
          limit: 10,
          offset: 0,
        },
      };
    }
  }
}

export async function getZoneById(id: string) {
  try {
    const getZoneByIdResponse = await axiosRequest(
      lucClient,
      {
        method: "GET",
        url: API_ROUTE.zone.one.replace("{id}", id),
      },
      true
    );
    const zone: ZoneInterface = getZoneByIdResponse.data.data;
    if (!zone) {
      return {
        success: false,
        error: "No zone data found",
      };
    }
    return {
      success: true,
      zone,
    };
  } catch (e) {
    if (e instanceof AxiosError) {
      return {
        success: false,
        error: e.response?.data.message,
      };
    }
    return {
      success: false,
      error: "Something went wrong!",
    };
  }
}
