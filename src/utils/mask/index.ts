export const maskPhone = (value: string) => {
  return value
    .replace(/\D/g, "") // remove tudo que não for dígito
    .replace(/^(\d{2})(\d)/g, "($1) $2") // adiciona parênteses e espaço
    .replace(/(\d{5})(\d)/, "$1-$2") // adiciona o traço
    .slice(0, 15); // limita a 15 caracteres
};
