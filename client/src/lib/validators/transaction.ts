import { z } from "zod";

export const TransactionSchema =
  z.object({
    title: z
      .string()
      .min(1, "Required"),

    amount: z.coerce
      .number()
      .positive(
        "Amount must be positive"
      ),

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
  z.output<typeof TransactionSchema>;
