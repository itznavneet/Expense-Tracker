import {z} from 'zod';
export const TransactionSchema = z.object({
    title: z.string().min(3, 'Title is required'),
    amount: z.number().min(1, 'Amount is required'),
    category: z.string().min(3, 'Category is required'),
    description: z.string().optional(),
    type: z.enum(['INCOME', 'EXPENSE']),
    date: z.string()
})