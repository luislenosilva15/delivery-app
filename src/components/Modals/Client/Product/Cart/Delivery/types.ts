export type DeliveryProps = {
  error: {
    option: string;
  };
  handleChangeOption: (value: string) => void;
  option: string | null;
};
