"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const signUpSchema = {
    type: 'object',
    properties: {
        email: { type: "string", minLength: 1 },
        password: { type: "string", minLength: 1 },
        name: { type: 'string', minLength: 1 },
        phone: { type: 'string', minLength: 1 },
        age: { type: 'number', minimum: 5 }
    },
    required: ['email', 'password', 'name', 'phone', 'age'],
    additionalProperties: false
};
const signInSchema = {
    type: 'object',
    properties: {
        email: { type: "string", minLength: 1 },
        password: { type: "string", minLength: 1 },
    },
    required: ['email', 'password'],
    additionalProperties: false
};
const emailSchema = {
    type: 'object',
    properties: {
        email: { type: "string", minLength: 1 },
    },
    required: ['email'],
    additionalProperties: false
};
const emailAgeSchema = {
    type: 'object',
    properties: {
        email: { type: "string", minLength: 1 },
        age: { type: "number", minimum: 5 }
    },
    required: ['email', 'age'],
    additionalProperties: false
};
const idSchema = {
    type: 'object',
    properties: {
        id: { type: "string", minLength: 1 }
    },
    required: ['id'],
    additionalProperties: false
};
const phoneSchema = {
    type: 'object',
    properties: {
        phone: { type: "string", minLength: 1 }
    },
    required: ['phone'],
    additionalProperties: false
};
exports.default = { signUpSchema, signInSchema, emailSchema, emailAgeSchema, idSchema, phoneSchema };
