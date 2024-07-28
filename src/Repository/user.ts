import { PrismaClient } from "@prisma/client";
import {User} from '../Interface/user'
import prisma from "../utils/prisma"


const save = async (userData: User) => {
    try {
        return await prisma.user.create({ data: userData });
    } catch (error) {
        throw new Error("Error saving user");
    }
}

const getUserByEmail = async (email: string) => {
    try {
        return await prisma.user.findUnique({ where: { email: email } });
    } catch (error) {
        throw new Error("Error fetching user by email");
    }
}

const getUsers = async () => {
    try {
        return await prisma.user.findMany();
    } catch (error) {
        throw new Error("Error fetching users");
    }
}

const deleteUserByEmail = async (email: string) => {
    try {
        return await prisma.user.delete({ where: { email: email } });
    } catch (error) {
        throw new Error("Error deleting user by email");
    }
}

const getUserByPhone = async (phone: string) => {
    try {
        return await prisma.user.findUnique({ where: { phone: phone } });
    } catch (error) {
        throw new Error("Error fetching user by phone");
    }
}

const updateAgeByEmail = async (email: string, newAge: number) => {
    try {
        return await prisma.user.update({ where: { email: email }, data: { age: newAge } });
    } catch (error) {
        throw new Error("Error updating user's age by email");
    }
}

const getUserById = async (id: string) => {
    try {
        return await prisma.user.findUnique({ where: { id: id } });
    } catch (error) {
        throw new Error("Error fetching user by ID");
    }
}
const deleteAllUsers=async()=>
    {
        try {
            return await prisma.user.deleteMany();
        } catch (error) {
            throw new Error("Error deleting all users!");
        }
    }

export default { save, getUserByEmail, getUsers, deleteUserByEmail, getUserByPhone, updateAgeByEmail, getUserById,deleteAllUsers }