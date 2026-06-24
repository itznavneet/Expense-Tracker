import { z } from "zod";

export const TransactionSchema =
  z.object({
    title: z
      .string()
      .min(2, "Required"),

    amount: z.number(),

    category: z
      .string()
      .min(1, "Required"),

    description:
      z.string().optional(),

      date: z
      .string()
      .min(1, "Required"),
  });

export type TransactionFormData =
  z.infer<typeof TransactionSchema>;