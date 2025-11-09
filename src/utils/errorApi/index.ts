import type { TError } from "@/store/features/client/types/models";

export const HandleApiError = (error: TError): string => {
  switch (error.response.data.statusCode) {
    case 403:
      return "Você não está autorizado a acessar a página solicitada.";
    case 401:
      return (
        error.response.data.message || "Não autorizado. Por favor, faça login."
      );
    default:
      return "Erro desconhecido. Por favor, tente novamente mais tarde.";
  }
};
