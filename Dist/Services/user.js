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
const user_1 = __importDefault(require("../Repository/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_config_1 = __importDefault(require("../Config/index.config"));
const cacheService_1 = __importDefault(require("../Cache/cacheService"));
const creatToken = (_id) => {
    return jsonwebtoken_1.default.sign({ _id: _id }, index_config_1.default.SECRET, { expiresIn: "1d" });
};
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function signUp(newUser) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!isValidEmail(newUser.email))
            throw Error("Email not valid");
        if (newUser.age <= 0)
            throw Error("Age not valid");
        if (newUser.password.length < 8)
            throw Error("Password not strong enough!");
        if (yield user_1.default.getUserByEmail(newUser.email)) {
            throw Error("Email already signed up");
        }
        try {
            const salt = yield bcrypt_1.default.genSalt(10);
            const hash = yield bcrypt_1.default.hash(newUser.password, salt);
            const response = yield user_1.default.save(Object.assign(Object.assign({}, newUser), { password: hash }));
            const token = creatToken(response.id);
            yield cacheService_1.default.setHash(response.id, response);
            return {
                message: "User created successfully",
                token: token,
                user: response,
            };
        }
        catch (error) {
            if (error instanceof Error)
                throw new Error(`Error signing up: ${error.message}`);
            //for non error objects
            throw new Error(`unexpected Error Signing up u ${String(error)}`);
        }
    });
}
function getUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const cached = yield cacheService_1.default.getAllUsers();
            if (cached)
                return { users: cached };
            const users = yield user_1.default.getUsers();
            if (!users)
                throw new Error("No users found!");
            yield cacheService_1.default.setAllUsers(users);
            return { users };
        }
        catch (error) {
            if (error instanceof Error)
                throw new Error(`Error fetching Users: ${error.message}`);
            //for non error objects
            throw new Error(`unexpected Error fetching users ${String(error)}`);
        }
    });
}
function getUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!isValidEmail(email))
            throw Error("Email not valid!");
        try {
            const response = yield user_1.default.getUserByEmail(email);
            if (!response)
                throw Error("User not found!");
            return { user: response };
        }
        catch (error) {
            if (error instanceof Error)
                throw new Error(`Error fetching User: ${error.message}`);
            //for non error objects
            throw new Error(`unexpected Error fetching users ${String(error)}`);
        }
    });
}
function getUserByPhone(phone) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield user_1.default.getUserByPhone(phone);
            if (response)
                return { user: response };
            else {
                throw Error("User not found!");
            }
        }
        catch (error) {
            if (error instanceof Error)
                throw new Error(`Error fetching User by email: ${error.message}`);
            //for non error objects
            throw new Error(`unexpected Error fetching user by email${String(error)}`);
        }
    });
}
function deleteUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield user_1.default.deleteUserByEmail(email);
            yield cacheService_1.default.del([
                `user:${email}`,
                `user:${response.id}`,
                "AllUsers",
            ]);
            return { response };
        }
        catch (error) {
            if (error instanceof Error)
                throw new Error(`Error deleting User: ${error.message}`);
            //for non error objects
            throw new Error(`unexpected Error deleting user ${String(error)}`);
        }
    });
}
function updateAgeByEmail(email, age) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const isEmailThere = yield user_1.default.getUserByEmail(email);
            if (!isEmailThere) {
                throw new Error("Email not signed up");
            }
            const response = yield user_1.default.updateAgeByEmail(email, age);
            if (response) {
                yield cacheService_1.default.del([`user:${email}`, "AllUsers"]);
                return { user: response };
            }
            else
                throw Error("Erro while updating Age");
        }
        catch (error) {
            if (error instanceof Error)
                throw new Error(`Error updating User: ${error.message}`);
            throw new Error(`unexpected Error updating user ${String(error)}`);
        }
    });
}
function signIn(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!email || !password)
                throw Error("All fields must be filled!");
            if (!isValidEmail(email))
                throw Error("Invalid Email");
            const user = yield user_1.default.getUserByEmail(email);
            if (!user)
                throw Error("Email not signed up");
            const match = yield bcrypt_1.default.compare(password, user.password);
            if (!match)
                throw Error("Incorrect passsword");
            const token = creatToken(user.id);
            return { token: token };
        }
        catch (error) {
            if (error instanceof Error)
                throw new Error(`Error signing in User: ${error.message}`);
            throw new Error(`unexpected Error signing in users ${String(error)}`);
        }
    });
}
function getUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const cached = yield cacheService_1.default.getHash(id);
            if (cached)
                return { user: cached };
            const response = yield user_1.default.getUserById(id);
            if (!response)
                throw Error("User not found");
            yield cacheService_1.default.setHash(id, response);
            return { user: response };
        }
        catch (error) {
            if (error instanceof Error)
                throw Error(error.message);
            throw new Error(`Unexpected Error getting user ${String(error)}`);
        }
    });
}
function deleteAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { users } = yield getUsers();
            if (users) {
                // Extract user IDs and emails
                const userIds = users.map((user) => user.id);
                const userEmails = users.map((user) => user.email);
                // Create cache keys for IDs and emails
                const keysToDelete = userIds.map((id) => `user:${id}`);
                const emailsToDelete = userEmails.map((email) => `user:${email}`);
                // Delete cache entries for both IDs and emails
                yield cacheService_1.default.del([...keysToDelete, ...emailsToDelete]);
            }
            const response = yield user_1.default.deleteAllUsers();
            if (response.count > 0) {
                yield cacheService_1.default.del(["AllUsers"]);
                return response;
            }
            else {
                throw new Error("Error deleting users!");
            }
        }
        catch (error) {
            if (error instanceof Error)
                throw new Error(`Error deleting Users: ${error.message}`);
            //for non error objects
            throw new Error(`unexpected Error deleting users ${String(error)}`);
        }
    });
}
exports.default = {
    signUp,
    getUsers,
    getUserByEmail,
    getUserByPhone,
    deleteUserByEmail,
    updateAgeByEmail,
    signIn,
    getUserById,
    deleteAllUsers,
};
