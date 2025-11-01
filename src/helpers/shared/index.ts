import { format, formatDistanceToNow, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import chroma from "chroma-js";

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

export const generateCompanyTheme = (primaryColor: string) => {
  const steps = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
  const scale = chroma
    .scale(["white", primaryColor, "black"])
    .mode("lab")
    .colors(steps.length);
  return Object.fromEntries(steps.map((step, i) => [step, scale[i]]));
};
