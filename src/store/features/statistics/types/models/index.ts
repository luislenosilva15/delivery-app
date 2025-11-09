export type TClient = {
  id: number;
  name: string;
  phone?: string | null;
  firstOrderDate?: string | null; // ISO date when client first ordered / became client
  lastOrderDate?: string | null; // ISO date of last order
  ordersCount?: number; // total orders
};
