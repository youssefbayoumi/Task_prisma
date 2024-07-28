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
const user_1 = __importDefault(require("../Services/user"));
function signUp(req, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newUser = {
                email: req.body.email,
                password: req.body.password,
                name: req.body.name,
                phone: req.body.phone,
                age: req.body.age
            };
            const response = yield user_1.default.signUp(newUser);
            return reply.status(200).send(Object.assign({}, response));
        }
        catch (e) {
            console.error(e);
            return reply.status(500).send({ error: e.message });
        }
    });
}
function getUsers(req, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield user_1.default.getUsers();
            return reply.status(200).send(users);
        }
        catch (e) {
            console.error(e);
            return reply.status(404).send({ error: e.message });
        }
    });
}
function getUserByEmail(req, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email } = req.params;
            const response = yield user_1.default.getUserByEmail(email);
            return reply.status(200).send(response);
        }
        catch (e) {
            console.error(e);
            return reply.status(500).send({ error: e.message });
        }
    });
}
function getUserByPhone(req, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { phone } = req.params;
            const response = yield user_1.default.getUserByPhone(phone);
            return reply.status(200).send(response);
        }
        catch (e) {
            console.error(e);
            return reply.status(500).send({ error: e.message });
        }
    });
}
function deleteUserByEmail(req, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email } = req.params;
            const response = yield user_1.default.deleteUserByEmail(email);
            return reply.status(200).send(Object.assign({ message: "user deleted successfully" }, response));
        }
        catch (e) {
            console.error(e);
            return reply.status(500).send({ error: e.message });
        }
    });
}
function updateAgeByEmail(req, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, age } = req.params;
            const age_int = Number(age);
            const res = yield user_1.default.updateAgeByEmail(email, age_int);
            return reply.send(res);
        }
        catch (e) {
            return reply.status(500).send({ Error: e.message });
        }
    });
}
function signIn(req, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const res = yield user_1.default.signIn(email, password);
            return reply.send(res);
        }
        catch (e) {
            console.error(e);
            return reply.status(500).send({ Error: e.message });
        }
    });
}
function getUserById(req, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const response = yield user_1.default.getUserById(id);
            return reply.status(200).send(response);
        }
        catch (e) {
            console.error(e);
            return reply.status(500).send({ error: e.message });
        }
    });
}
function deleteAllUsers(req, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield user_1.default.deleteAllUsers();
            return reply.status(200).send(response);
        }
        catch (e) {
            return reply.status(400).send({ Error: e.message });
        }
    });
}
exports.default = { signUp, getUsers, getUserByEmail, getUserByPhone, deleteUserByEmail, updateAgeByEmail, signIn, getUserById, deleteAllUsers };
