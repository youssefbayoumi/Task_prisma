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
const ajv_1 = __importDefault(require("ajv"));
const schemas_1 = __importDefault(require("../Model/schemas"));
const ajv = new ajv_1.default();
ajv.addSchema(schemas_1.default.signUpSchema, "signUpVal");
ajv.addSchema(schemas_1.default.signInSchema, "signInVal");
ajv.addSchema(schemas_1.default.emailSchema, "byEmail");
ajv.addSchema(schemas_1.default.emailAgeSchema, "byEmailAge");
ajv.addSchema(schemas_1.default.idSchema, "byId");
ajv.addSchema(schemas_1.default.phoneSchema, "byPhone");
//how hena lazem req,reply wala momken object
function signUpVal(req, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const val = ajv.getSchema("signUpVal");
        if (!val)
            return reply.status(500).send({ Error: "SignUp Schema not found" });
        if (!val(req.body)) {
            return reply.status(400).send({ Error: JSON.stringify(val.errors) });
        }
    });
}
function signInVal(req, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const val = ajv.getSchema("signInVal");
        if (!val)
            return reply.status(500).send({ Error: "SignIn Schema not found" });
        if (!val(req.body)) {
            return reply.status(400).send({ Error: JSON.stringify(val.errors) });
        }
    });
}
function byEmail(req, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const val = ajv.getSchema("byEmail");
        if (!val)
            return reply.status(500).send({ Error: "Email Schema not found" });
        if (!val(req.params)) {
            return reply.status(400).send({ Error: JSON.stringify(val.errors) });
        }
    });
}
function byEmailAge(req, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const val = ajv.getSchema("byEmailAge");
        if (!val)
            return reply.status(500).send({ Error: "EmailAge Schema not found" });
        const { email, age } = req.params;
        const age_int = Number(age);
        if (!val({ email, age: age_int })) {
            return reply.status(400).send({ Error: JSON.stringify(val.errors) });
        }
    });
}
function byId(req, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const val = ajv.getSchema("byId");
        if (!val)
            return reply.status(500).send({ Error: "Id Schema not found" });
        if (!val(req.params)) {
            return reply.status(400).send({ Error: JSON.stringify(val.errors) });
        }
    });
}
function byPhone(req, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const val = ajv.getSchema("byPhone");
        if (!val)
            return reply.status(500).send({ Error: "Phone Schema not found" });
        if (!val(req.params)) {
            return reply.status(400).send({ Error: JSON.stringify(val.errors) });
        }
    });
}
exports.default = { signUpVal, signInVal, byEmail, byEmailAge, byId, byPhone };
