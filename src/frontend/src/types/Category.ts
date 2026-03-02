export interface Category {
  id: number;
  categoryid: string;
  categoryName: string;
  categoryBackGround: string;
  active: boolean;
}

export type CategoryCreate = Pick<
  Category,
  "categoryName" | "categoryBackGround"
>;
