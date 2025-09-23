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