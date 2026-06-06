import prisma from "../config/prisma";


export async function getTotalIncome(userId:string) {
    return prisma.transaction.aggregate({
        where:{
        userId,
        type: "INCOME"
    },
       _sum:{
        amount: true
       }
    });
}
export async function getTotalExpense(userId:string) {
    return prisma.transaction.aggregate({
        where:{
        userId,
        type: "EXPENSE"
    },
       _sum:{
        amount: true
       }
    });
}
export async function getCategoryAnalyis(userId:string) {
    return prisma.transaction.groupBy({
       by:["category"],
       where: {userId, type: "EXPENSE"},
       _sum:{
        amount: true
       }
    });
}