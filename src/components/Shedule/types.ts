type Interval = { start: string; end: string };
type Schedule = Record<string, Interval[]>;

export interface Props {
  alwaysAvailable: boolean;
  daysOff: string[];
  schedule: Schedule;
  avaliableText: string;
  onChange: (data: {
    alwaysAvailable: boolean;
    daysOff: string[];
    schedule: Schedule;
  }) => void;
  errors?: string;
}
