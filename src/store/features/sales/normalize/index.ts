import type { FetchSalesResponse } from "../types/requests";
import type { TSale } from "../types/models";

export const normalizeSales = (sales: FetchSalesResponse["sales"]): TSale[] => {
  return sales.map((s) => ({
    id: s.id,
    createdAt: s.createdAt,
    updatedAt: s.updatedAt,
    status: s.status,
    clientId: s.clientId,
    clientName: s.clientName,
    companyId: s.companyId,
    totalPrice: s.totalPrice,
    outDeliveryDate: s.outDeliveryDate,
    documentInTicket: s.documentInTicket,
    paymentMethod: s.paymentMethod,
    deliveryMethod: s.deliveryMethod,
  }));
};
