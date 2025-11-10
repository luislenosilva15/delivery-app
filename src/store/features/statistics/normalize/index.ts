import type { FetchClientsResponse } from "../types/requests";

export const normalizeClient = (clients: FetchClientsResponse["clients"]) => {
  return clients.map((client) => {
    return {
      id: client.id,
      name: client.name,
      phone: client.phone,
      lastOrderDate: client.orders.length ? client.orders[0].createdAt : null,
      firstOrderDate: client.orders.length
        ? client.orders[client.orders.length - 1].createdAt
        : null,
      ordersCount: client.orders.length,
      totalSpent: client.orders.reduce(
        (acc, order) => acc + (order.totalPrice || 0),
        0
      ),
    };
  });
};
