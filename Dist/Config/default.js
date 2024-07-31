"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL || "postgres://postgres:123@10.0.11.64:5432/listdb";
const SECRET = process.env.SECRET || "KFJSKAFJDKGBGHKLAH";
const cacheConfig = {
    password: process.env.CACHE_PASSWORD,
    host: process.env.CACHE_HOST,
    port: process.env.CACHE_PORT
};
exports.default = {
    PORT,
    DATABASE_URL,
    SECRET,
    cacheConfig
};
