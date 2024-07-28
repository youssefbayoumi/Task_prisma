"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const default_1 = __importDefault(require("./default"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = Object.assign(Object.assign({}, default_1.default), { PORT: process.env.PRODUCTION_PORT || 4000 });
