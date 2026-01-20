interface UserInterface {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

interface UserDataInterface {
  users: UserInterface[];
  count: number;
  pagination: {
    limit: number;
    offset: number;
  };
}

type USER_ROLE = 'SUPERADMIN' | 'ADMIN' | 'USER' | 'PROPERTY_OWNER';

interface PropertyInterface {
  id: string;
  code: string;
  address: string;
  lga: string;
  lcda: string;
  ward: string;
  ownerId: string;
  ownershipType: 'INDIVIDUAL' | 'COMPANY';
  companyId?: string | null;
  zoneId: string;
  assignedAgentId?: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  propertyType: 'LAND' | 'BUILDING';
  propertyUse: 'RESIDENTIAL' | 'COMMERCIAL' | 'INDUSTRIAL' | 'MIXED';
  locationClass: string;
  buildingType?: string;
  numberOfUnits?: number;
  buildingHeight?: number;
  coveredArea: number;
  yearBuilt?: number;
  condition: 'NEW' | 'GOOD' | 'FAIR' | 'POOR';
  wallType?: string;
  roofType?: string;
  finishingQuality: 'BASIC' | 'STANDARD' | 'PREMIUM';
  locationWeight: number;
  useWeight: number;
  typeWeight: number;
  buildingFactor: number;
  areaFactor: number;
  estimatedValue: number;
  annualLUC: number;
  waitTime: number;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'VERIFIED';
  rejectionReason?: string;
  verifiedAt?: string;
  verifiedBy?: string;
}

interface PropertyDataInterface {
  data: PropertyInterface[];
  meta: {
    total: number;
    page: number;
    totalPages: number;
    limit: number;
  };
}