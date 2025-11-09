export const maskPhone = (value: string) => {
  return value
    .replace(/\D/g, "") // remove tudo que não for dígito
    .replace(/^(\d{2})(\d)/g, "($1) $2") // adiciona parênteses e espaço
    .replace(/(\d{5})(\d)/, "$1-$2") // adiciona o traço
    .slice(0, 15); // limita a 15 caracteres
};

export const maskCEP = (value: string) => {
  return value
    .replace(/\D/g, "") // remove tudo que não for número
    .replace(/^(\d{5})(\d)/, "$1-$2") // coloca o hífen depois dos 5 primeiros dígitos
    .slice(0, 9); // limita a 9 caracteres
};

export const maskCpfCnpj = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 14);

  if (digits.length <= 11) {
    const p1 = digits.slice(0, 3);
    const p2 = digits.slice(3, 6);
    const p3 = digits.slice(6, 9);
    const p4 = digits.slice(9, 11);

    let out = p1;
    if (p2) out += `.${p2}`;
    if (p3) out += `.${p3}`;
    if (p4) out += `-${p4}`;
    return out;
  }

  const p1 = digits.slice(0, 2);
  const p2 = digits.slice(2, 5);
  const p3 = digits.slice(5, 8);
  const p4 = digits.slice(8, 12);
  const p5 = digits.slice(12, 14);

  let out = p1;
  if (p2) out += `.${p2}`;
  if (p3) out += `.${p3}`;
  if (p4) out += `/${p4}`;
  if (p5) out += `-${p5}`;
  return out;
};
