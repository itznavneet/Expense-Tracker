import { z } from "zod";
export const LoginSchema= z.object({
    email: z.email("Please enter valid email"),
    password: z
    .string()
    .min(
      4,
      "Password must be at least 4 characters"
    ),

})
export const RegisterSchema= z.object({
    name:z.string().min(1,"Name is required").max(50,"Name must be less than 50 characters"),
    email: z.email("Please enter valid email"),
    password: z
    .string()
    .min(
      4,
      "Password must be at least 4 characters"
    ),

})

export type RegisterFormData= z.infer<typeof RegisterSchema>
export type LoginFormData= z.infer<typeof LoginSchema>