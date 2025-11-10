import type { FetchClientsResponse } from "../types/requests";

export const normalizeClient = (clients: FetchClientsResponse["clients"]) => {
  return clients.map((client) => {
    return {
      id: client.id,
      name: client.name,
      phone: client.phone,
      firstOrderDate: client.orders.length ? client.orders[0].createdAt : null,
      lastOrderDate: client.orders.length
        ? client.orders[client.orders.length - 1].createdAt
        : null,
      ordersCount: client.orders.length,
    };
  });
};
