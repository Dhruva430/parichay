// @ts-check
import { z } from "zod";

export const SignupSchema = z.object({
  username: z.string(),
  email: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  password: z.string(),
});

export const SigninSchema = z.object({
  username: z.string(),
  password: z.string(),
});
