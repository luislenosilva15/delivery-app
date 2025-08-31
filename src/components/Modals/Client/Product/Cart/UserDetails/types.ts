export type UserDetailsProps = {
  error: {
    name: string;
    phone: string;
  };
  phone: string;
  name: string;
  onChange: (field: keyof UserDetailsProps["error"], value: string) => void;
};
