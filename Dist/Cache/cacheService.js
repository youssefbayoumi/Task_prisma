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
const cacheClient_1 = __importDefault(require("./cacheClient"));
// const get=async (key:string)=>
//     {
//     }
function get(key) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield cacheClient_1.default.get(key);
            if (!res)
                return null;
            yield cacheClient_1.default.expire(key, 3600);
            return JSON.parse(res);
        }
        catch (e) {
            throw Error(e.message);
        }
    });
}
function setHash(id, value) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //array with values
            const multi = cacheClient_1.default.multi();
            const key = `user:${id}`;
            const res = multi.hset(key, value);
            //only add the list if it is already present
            if ((yield cacheClient_1.default.exists("AllUsers")) === 1)
                multi.sadd("AllUsers", id);
            yield multi.exec();
            yield cacheClient_1.default.expire(key, 3600);
            return res;
        }
        catch (e) {
            throw Error(e.message);
        }
    });
}
function getHash(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const key = `user:${id}`;
            const res = yield cacheClient_1.default.hgetall(key);
            if (Object.keys(res).length === 0)
                return null;
            yield cacheClient_1.default.expire(key, 3600);
            if ((yield cacheClient_1.default.exists("AllUsers")) === 1)
                cacheClient_1.default.sadd("AllUsers", id);
            return res;
            //  return Object.keys(res).length === 0 ? null : res;
        }
        catch (e) {
            throw new Error(e.message);
        }
    });
}
function del(key) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield cacheClient_1.default.del(...key);
            return res;
        }
        catch (e) {
            throw Error(e.message);
        }
    });
}
function setAllUsers(users) {
    return __awaiter(this, void 0, void 0, function* () {
        const multi = cacheClient_1.default.multi();
        for (const user of users) {
            const userKey = `user:${user.id}`;
            multi.hset(userKey, user);
            multi.sadd("AllUsers", user.id);
        }
        yield multi.exec();
    });
}
function getAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        //   const userIDs = await redis.smembers("AllUsers");
        const userIDs = ["james", "john", "jane", "jake", "josh"];
        const pipeline = cacheClient_1.default.pipeline();
        for (const id of userIDs) {
            pipeline.hgetall(`user:${id}`);
        }
        const results = yield pipeline.exec();
        if (results &&
            results.length > 0 &&
            !results.some(([result]) => result === null)) {
            return results.map((result) => result[1]);
        }
        return null;
    });
}
exports.default = { get, getHash, setHash, del, setAllUsers, getAllUsers };
