interface ZoneInterface {
  id: string;
  zoneName: string;
  zoneType: string;
  residentialRate: number;
  commercialRate: number;
  industrialRate: number;
  status: string;
  taxRate: number;
  avgPropertyValue: number;
  lastUpdated: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

interface ZoneDataInterface {
  zones: ZoneInterface[];
  count: number;
  pagination: {
    limit: number;
    offset: number;
  };
}
