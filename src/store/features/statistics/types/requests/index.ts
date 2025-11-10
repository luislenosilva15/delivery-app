export interface FetchClientsResponse {
  clients: {
    id: number;
    name: string;
    email: string | null;
    phone: string;
    createdAt: string;
    updatedAt: string;
    companyId: number;
    orders: [
      {
        createdAt: string;
      }
    ];
  }[];
  total: number;
  totalPages?: number;
  page: number;
  totalItems?: number;
}
