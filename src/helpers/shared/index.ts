import { format, formatDistanceToNow, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export const moneyFormat = (value: number) => {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

export const formatTimeAgo = (isoString: string) => {
  return formatDistanceToNow(parseISO(isoString), {
    addSuffix: true,
    locale: ptBR,
  });
};

export const formatDate = (isoString: string) => {
  return format(isoString, "dd/MM/yyyy HH:mm");
};
