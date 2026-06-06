import {z} from 'zod';

export const registerSchema = z.object({
  name: z.string().min(3, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(4, 'Password must be at least 4 characters long'),
});

export const loginSchema =
  z.object({
    email: z.email(),
    password: z.string()
  });