export type TClient = {
  id: number;
  name: string;
  phone?: string | null;
  firstOrderDate?: string | null;
  lastOrderDate?: string | null;
  ordersCount?: number;
};
