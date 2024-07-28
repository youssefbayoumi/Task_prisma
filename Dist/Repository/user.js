"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../utils/prisma"));
const save = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma_1.default.user.create({ data: userData });
    }
    catch (error) {
        throw new Error("Error saving user");
    }
});
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma_1.default.user.findUnique({ where: { email: email } });
    }
    catch (error) {
        throw new Error("Error fetching user by email");
    }
});
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma_1.default.user.findMany();
    }
    catch (error) {
        throw new Error("Error fetching users");
    }
});
const deleteUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma_1.default.user.delete({ where: { email: email } });
    }
    catch (error) {
        throw new Error("Error deleting user by email");
    }
});
const getUserByPhone = (phone) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma_1.default.user.findUnique({ where: { phone: phone } });
    }
    catch (error) {
        throw new Error("Error fetching user by phone");
    }
});
const updateAgeByEmail = (email, newAge) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma_1.default.user.update({ where: { email: email }, data: { age: newAge } });
    }
    catch (error) {
        throw new Error("Error updating user's age by email");
    }
});
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma_1.default.user.findUnique({ where: { id: id } });
    }
    catch (error) {
        throw new Error("Error fetching user by ID");
    }
});
const deleteAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma_1.default.user.deleteMany();
    }
    catch (error) {
        throw new Error("Error deleting all users!");
    }
});
exports.default = { save, getUserByEmail, getUsers, deleteUserByEmail, getUserByPhone, updateAgeByEmail, getUserById, deleteAllUsers };
