"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config;
const environment = process.env.NODE_ENV || 'default';
const config = require(`./${environment}`).default;
exports.default = config;
