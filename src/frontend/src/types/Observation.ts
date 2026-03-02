export interface ObservationType {
  id: number;
  recordId: string;
  title: string;
  categoryid: string;
  employeeid: string;
  location: string;
  date: string;
  active: boolean;
}

export type ObservationCreate = Omit<ObservationType, "id" | "recordId">;
