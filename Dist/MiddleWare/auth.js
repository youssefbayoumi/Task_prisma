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
const index_config_1 = __importDefault(require("../Config/index.config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../Repository/user"));
function auth(req, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const { authorization } = req.headers;
        if (!authorization) {
            return reply.status(401).send({ error: "Authorization required" });
        }
        const token = authorization.split(' ')[1];
        try {
            const { _id } = jsonwebtoken_1.default.verify(token, index_config_1.default.SECRET);
            const user = yield user_1.default.getUserById(_id);
            if (!user) {
                throw Error("UnAuthorized!!");
            }
            return;
        }
        catch (e) {
            reply.status(500).send({ Message: "UnAuthorized!!" });
        }
    });
}
exports.default = auth;
