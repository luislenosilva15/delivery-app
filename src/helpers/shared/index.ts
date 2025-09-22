import { formatDistanceToNow, parseISO } from "date-fns";

export const moneyFormat = (value: number) => {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

export const formatTimeAgo = (isoString: string) => {
  return formatDistanceToNow(parseISO(isoString), {
    addSuffix: true,
  });
};
