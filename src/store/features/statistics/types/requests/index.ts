export interface FetchClientsResponse {
  clients: {
    id: number;
    name: string;
    email: string | null;
    phone: string;
    createdAt: string;
    updatedAt: string;
    companyId: number;
    firstOrderDate?: string;
    lastOrderDate?: string;
    totalSpent?: number;
    totalOrders?: number;
  }[];
  total: number;
  totalPages?: number;
  page: number;
  totalItems?: number;
}
