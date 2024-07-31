"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
const index_config_1 = __importDefault(require("../Config/index.config"));
const redis = new ioredis_1.default({
    host: index_config_1.default.cacheConfig.host,
    port: index_config_1.default.cacheConfig.port,
    password: index_config_1.default.cacheConfig.password
});
exports.default = redis;
