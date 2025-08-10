export type Hour = {
  open: string;
  close: string;
};

export type Day = {
  enabled: boolean;
  hours: Hour[];
};
