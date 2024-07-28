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
const creatToken = (_id) => {
    return jsonwebtoken_1.default.sign({ _id: _id }, index_config_1.default.SECRET, { expiresIn: '1d' });
};
function signUp(newUser) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!isValidEmail(newUser.email)) {
            throw Error("Email not valid");
        }
        if (newUser.age <= 0) {
            throw Error("Age not valid");
        }
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
            return { message: "User created successfully", token: token, user: response };
        }
        catch (e) {
            console.error(e);
            throw Error(e.message);
        }
    });
}
function getUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield user_1.default.getUsers();
            if (users)
                return { users };
            else {
                throw Error("No users found!");
            }
        }
        catch (e) {
            throw Error(e.message);
        }
    });
}
function getUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!isValidEmail(email)) {
            throw Error("Email not valid!");
        }
        try {
            const response = yield user_1.default.getUserByEmail(email);
            console.log(response);
            if (response)
                return { user: response };
            else {
                throw Error("User not found!");
            }
        }
        catch (e) {
            throw Error(e.message);
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
        catch (e) {
            throw Error(e.message);
        }
    });
}
function deleteUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield user_1.default.deleteUserByEmail(email);
            return { response };
        }
        catch (e) {
            throw new Error(e.message);
        }
    });
}
function updateAgeByEmail(email, age) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const isEmailThere = yield user_1.default.getUserByEmail(email);
            if (!isEmailThere) {
                // return { Error:"Email not signedUp!"}
                throw Error("Email not signed up");
            }
            const response = yield user_1.default.updateAgeByEmail(email, age);
            if (response)
                return { user: response };
            else
                throw Error("Erro while updating Age");
        }
        catch (e) {
            return { error: e.message };
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
        catch (e) {
            return { Error: e.message };
        }
    });
}
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function getUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield user_1.default.getUserById(id);
            if (response)
                return { user: response };
            else {
                throw Error("User not found");
            }
        }
        catch (e) {
            throw Error(e.message);
        }
    });
}
function deleteAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield user_1.default.deleteAllUsers();
            if (response)
                return response;
            else {
                throw Error("Error deleting users!");
            }
        }
        catch (e) {
            throw Error(e.message);
        }
    });
}
exports.default = { signUp, getUsers, getUserByEmail, getUserByPhone, deleteUserByEmail, updateAgeByEmail, signIn, getUserById, deleteAllUsers };
