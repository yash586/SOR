import type { TokenPayLoad } from "../types/TokenPayload";

export const decodeToken = (token: string): TokenPayLoad => {
  const base64Payload = token.split(".")[1];
  const decoded = JSON.parse(atob(base64Payload));
  return decoded;
};
