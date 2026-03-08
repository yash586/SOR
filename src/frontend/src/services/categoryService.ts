import { CategoryCreate } from "../types/Category";
import axiosInstance from "../utils/axiosInstance";

export const getCategories = async () => {
  const { data } = await axiosInstance.get("/category/listCategories");
  return data;
};

export const createCategory = async (payload: CategoryCreate) => {
  try {
    const data = await axiosInstance.post("/category/createCategory", payload);
    return data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed Creating Observation",
    );
  }
};

export const categoryDelete = async (id: string) => {
  try {
    const { data } = await axiosInstance.delete(
      `/category/deleteCategory/${id}`,
    );
    return data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed Deleting Category",
    );
  }
};
