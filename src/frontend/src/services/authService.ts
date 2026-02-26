import axiosInstance from "../utils/axiosInstance";
import { LoginPayload } from "../types/LoginPayload";
import { RegisterPayload } from "../types/RegisterPayload";
import { AuthResponse } from "../types/AuthResponse";

export const loginUser = async (
  payload: LoginPayload,
): Promise<AuthResponse> => {
  try {
    const { data } = await axiosInstance.post("/login", payload);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login Failed");
  }
};

export const registerUser = async (payload: RegisterPayload) => {
  try {
    await axiosInstance.post("/register", payload);
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Registration Failed");
  }
};
