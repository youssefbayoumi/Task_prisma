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
function setHash(key, value) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //array with values
            const entries = Object.entries(value).flat();
            const res = yield cacheClient_1.default.hset(key, ...entries);
            yield cacheClient_1.default.expire(key, 3600);
            return res;
        }
        catch (e) {
            throw Error(e.message);
        }
    });
}
function getHash(key) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield cacheClient_1.default.hgetall(key);
            if (Object.keys(res).length === 0)
                return null;
            yield cacheClient_1.default.expire(key, 3600);
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
function sAdd(key, value) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield cacheClient_1.default.sadd(key, ...value);
            yield cacheClient_1.default.expire(key, 3600);
            return res;
        }
        catch (e) {
            throw Error(e.message);
        }
    });
}
function sGet(key) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield cacheClient_1.default.smembers(key);
            if (res.length <= 0)
                return null;
            yield cacheClient_1.default.expire(key, 3600);
            return res;
        }
        catch (e) {
            throw Error(e.message);
        }
    });
}
exports.default = { get, getHash, setHash, sAdd, sGet, del };
