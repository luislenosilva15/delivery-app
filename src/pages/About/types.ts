export type CompanyAboutData = {
  email: string;
  name: string;
  legalName: string;
  document?: string;
  phone?: string;
  logoUrl: string;
  logoFile?: File | null | string;
  address: {
    street: string;
    number: string;
    complement?: string;
    city: string;
    state: string;
    zipCode: string;
  };
  cuisineType: string;
};
