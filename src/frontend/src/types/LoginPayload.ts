import { RegisterPayload } from "./RegisterPayload";

export type LoginPayload = Pick<RegisterPayload, "email" | "password">;
