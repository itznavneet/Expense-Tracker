export interface Transaction {
    id: string;
    title: string;
    amount: number;
    category: string;
    description?: string;
    type: "INCOME" | "EXPENSE";
    date: string;
}