export type UserDetailsProps = {
  error: {
    name: string;
    phone: string;
    documentInTicket: string;
  };
  phone: string;
  name: string;
  documentInTicket: string;
  onChange: (field: keyof UserDetailsProps["error"], value: string) => void;
};
