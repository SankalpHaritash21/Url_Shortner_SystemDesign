import { z } from "zod";

export const userSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email format." })
    .nonempty({ message: "Email is required." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." })
    .max(100, { message: "Password must not exceed 100 characters." }),
});
