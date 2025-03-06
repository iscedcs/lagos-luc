export interface Property {
  id: number;
  address: string;
  area: string;
  owner: string;
  ownerContact: string;
  type: string;
  landSize: number;
  zone: string;
  paymentStatus: string;
  amountDue: number;
  dueDate: string;
  lastPaymentDate?: string;
  boundaries: [number, number][];
  center: [number, number];
  rooms?: number;
  isDeveloped?: boolean;
}
