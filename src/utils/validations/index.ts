export const isValidPhone = (phone: string): boolean => {
  const digits = phone.replace(/\D/g, "");
  return digits.length === 11;
};

export const isValidPassword = (password: string): boolean => {
  if (!password) return false;
  return password.length < 6;
};
