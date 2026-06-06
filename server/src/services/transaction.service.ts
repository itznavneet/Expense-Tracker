import prisma from "../config/prisma";

export async function createTransaction(data: {
    title: string;
    amount: number;
    category: string;
    description?: string;
    type: "INCOME" | "EXPENSE";
    date: string;
    userId: string;
}) {
    return prisma.transaction.create({
        data:{
            ...data,
            date: new Date(data.date)
        }
    });
}

export async function getTransactions(userId:string) {
    return prisma.transaction.findMany({
        where:{
        userId
    },
        orderBy: {
            createdAt: 'desc'
        }
    });
}
