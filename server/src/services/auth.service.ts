import prisma from "../config/prisma";

interface RegisterUserData{
    name: string;
    email: string;
    password: string;
}

export async function findUserByEmail(email: string) {
    return await prisma.user.findUnique({
        where: { email },
    });
}

export async function createUser(data: RegisterUserData) {
    return prisma.user.create({
        data,
    });
}

export async function findUserById(id:string){
    return prisma.user.findUnique({
        where:{
            id
        }
    })
}