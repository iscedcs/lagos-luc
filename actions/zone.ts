'use server'
import { axiosRequest, lucClient } from "@/axios-client";
import { API_ROUTE } from "@/lib/const";

export interface ZoneCreateInput {
  zoneName: string;
  zoneType: "PREMIUM" | "STANDARD" | "DEVELOPING";
  residentialRate: number;
  commercialRate: number;
  industrialRate: number;
  status: "ACTIVE" | "INACTIVE";
  taxRate: number;
  avgPropertyValue: number;
}

export interface Zone extends ZoneCreateInput {
  id: string;
  lastUpdated: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ZoneResponse {
  success: boolean;
  message: string;
  data: Zone;
}

export interface ZonesResponse {
  success: boolean;
  message: string;
  data: {
    zones: Zone[];
    count: number;
    pagination: {
      limit: number;
      offset: number;
    };
  };
}

export interface ZoneStats {
  totalZones: number;
  zoneTypeBreakdown: {
    PREMIUM: number;
    STANDARD: number;
    DEVELOPING: number;
  };
  avgPropertyValue: number;
  locationClassBreakdown: {
    HighValueZone: number;
    MediumValueZone: number;
  };
}

export interface ZoneStatsResponse {
  success: boolean;
  message: string;
  data: ZoneStats;
}

export async function createZone(data: ZoneCreateInput) {
  try {
    const response = await axiosRequest(lucClient, {
        method: 'POST',
        url: API_ROUTE.zone.create,
        data
    });
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to create zone',
      data: null
    };
  }
}

export async function getAllZones(limit: number = 10, offset: number = 0) {
  try {
    const response = await axiosRequest(lucClient, {
      method: 'GET',
      url: `${API_ROUTE.zone.all}?limit=${limit}&offset=${offset}`
    });
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch zones',
      data: { zones: [], count: 0, pagination: { limit, offset } }
    };
  }
}

export async function searchZones(query: string) {
  try {
    const response = await axiosRequest(lucClient, {
      method: 'GET',
      url: `${API_ROUTE.zone.search}?query=${encodeURIComponent(query)}`
    });
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to search zones',
      data: []
    };
  }
}

export async function getZoneById(id: string) {
  try {
    const response = await axiosRequest(lucClient, {
      method: 'GET',
      url: `${API_ROUTE.zone.one}/${id}`
    });
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch zone',
      data: null
    };
  }
}

export async function updateZone(id: string, data: Partial<ZoneCreateInput>) {
  try {
    const response = await axiosRequest(lucClient, {
      method: 'PATCH',
      url: `${API_ROUTE.zone.update}/${id}`,
      data
    });
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to update zone',
      data: null
    };
  }
}

export async function getZoneStats() {
  try {
    const response = await axiosRequest(lucClient, {
      method: 'GET',
      url: API_ROUTE.zone.stats
    });
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch zone statistics',
      data: null
    };
  }
}

export async function deleteZone(id: string) {
  try {
    const response = await axiosRequest(lucClient, {
      method: 'PATCH',
      url: `${API_ROUTE.zone.delete}/${id}`
    });
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to delete zone',
      data: null
    };
  }
}