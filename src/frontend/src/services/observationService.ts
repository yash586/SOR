import { ObservationCreate } from "../types/Observation";
import axiosInstance from "../utils/axiosInstance";

export const getObservations = async (status: "active" | "inactive") => {
  const { data } = await axiosInstance.get(
    `/listView?status=${status === "active"}`,
  );
  console.log(data);
  return data;
};

export const createObservation = async (payload: ObservationCreate) => {
  try {
    const data = await axiosInstance.post("/createObservation", payload);
    return data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed Creating Observation",
    );
  }
};

export const deleteObservation = async (recordId: string) => {
  try {
    const { data } = await axiosInstance.delete(
      `/deleteObservation/${recordId}`,
    );
    return data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed Deleting Observation",
    );
  }
};
