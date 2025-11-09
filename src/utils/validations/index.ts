export const isValidPhone = (phone: string): boolean => {
  if (!phone.length) return true;
  const digits = phone.replace(/\D/g, "");
  return digits.length === 11;
};

export const isValidPassword = (password: string): boolean => {
  if (!password) return false;
  return password.length < 6;
};

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export const formatToBRL = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export const isValidCPF = (value: string): boolean => {
  const cpf = (value || "").replace(/\D/g, "");
  if (!cpf || cpf.length !== 11) return false;
  // reject known invalid CPFs
  if (/^(\d)\1+$/.test(cpf)) return false;

  const numbers = cpf.split("").map((d) => parseInt(d, 10));

  const calcDigit = (sliceLen: number) => {
    let sum = 0;
    for (let i = 0; i < sliceLen; i++) {
      sum += numbers[i] * (sliceLen + 1 - i);
    }
    const result = sum % 11;
    return result < 2 ? 0 : 11 - result;
  };

  const digit1 = calcDigit(9);
  const digit2 = calcDigit(10);

  return digit1 === numbers[9] && digit2 === numbers[10];
};

export const isValidCNPJ = (value: string): boolean => {
  const cnpj = (value || "").replace(/\D/g, "");
  if (!cnpj || cnpj.length !== 14) return false;
  // reject known invalid CNPJs
  if (/^(\d)\1+$/.test(cnpj)) return false;

  const numbers = cnpj.split("").map((d) => parseInt(d, 10));

  const calc = (sliceLen: number, weights: number[]) => {
    let sum = 0;
    for (let i = 0; i < sliceLen; i++) {
      sum += numbers[i] * weights[i];
    }
    const result = sum % 11;
    return result < 2 ? 0 : 11 - result;
  };

  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const weights2 = [6].concat(weights1);

  const digit1 = calc(12, weights1);
  const digit2 = calc(13, weights2);

  return digit1 === numbers[12] && digit2 === numbers[13];
};

export const isValidCpfCnpj = (value: string): boolean => {
  const digits = (value || "").replace(/\D/g, "");
  if (digits.length === 11) return isValidCPF(digits);
  if (digits.length === 14) return isValidCNPJ(digits);
  return false;
};
