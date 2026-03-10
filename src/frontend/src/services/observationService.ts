import { ObservationCreate } from "../types/Observation";
import axiosInstance from "../utils/axiosInstance";

export const getObservations = async (status: "active" | "inactive") => {
  const { data } = await axiosInstance.get(
    `/listView?status=${status === "active"}`,
  );
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

export const update = async (recordId: string, payload: ObservationCreate) => {
  try {
    const { data } = await axiosInstance.patch(
      `/updateObservation/${recordId}`,
      payload,
    );
    return data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to update Observation",
    );
  }
};

export const getUploadUrl = async (
  fileName: string,
  fileType: string,
): Promise<{ presignedUrl: string; fileUrl: string }> => {
  const { data } = await axiosInstance.get("/getFileUploadUrl", {
    params: { fileName, fileType },
  });
  return data.data;
};

export const uploadToS3 = async (presignedUrl: string, file: File) => {
  await fetch(presignedUrl, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": file.type,
    },
  });
};
