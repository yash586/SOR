import { Category } from "./Category";

export interface ObservationType {
  id: number;
  recordId: string;
  title: string;
  categoryid: string;
  employeeid: string;
  location: string;
  date: number | string;
  active: boolean;
}

export type ObservationCreate = Omit<
  ObservationType,
  "id" | "recordId" | "active" | "categoryName" | "categoryBackGround"
>;
export type ObservationUpdate = Omit<
  ObservationType,
  "id" | "recordId" | "active"
>;

export interface Observation {
  id: number;
  recordId: string;
  title: string;
  category: Category;
  employeeid: string;
  location: string;
  date: number | string;
  active: boolean;
}
