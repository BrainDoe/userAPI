import { object, string, TypeOf } from "zod";

export const createLoginSchema = object({
  body: object({
    email: string({
      required_error: "Email is required",
    }).email("Invalid email or password"),
    password: string({
      required_error: "Password is required",
    }).min(6, "Invalid email or password"),
  }),
});

export type CreateLoginInput = TypeOf<typeof createLoginSchema>["body"];
