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
const userController_1 = __importDefault(require("../Controller/userController"));
const auth_1 = __importDefault(require("../MiddleWare/auth"));
const validationn_1 = __importDefault(require("../MiddleWare/validationn"));
function userRoutes(server, options) {
    return __awaiter(this, void 0, void 0, function* () {
        // server.post("/signup",{schema:Schemas.signUpSchema},userController.signUp);
        server.post("/signup", { preValidation: validationn_1.default.signUpVal }, userController_1.default.signUp);
        server.get("/", { preHandler: auth_1.default }, userController_1.default.getUsers);
        server.get("/email/:email", { preValidation: validationn_1.default.byEmail, preHandler: auth_1.default }, userController_1.default.getUserByEmail);
        server.get("/byphone/:phone", { preValidation: validationn_1.default.byPhone, preHandler: auth_1.default }, userController_1.default.getUserByPhone);
        server.delete("/email/:email", { preValidation: validationn_1.default.byEmail, preHandler: auth_1.default }, userController_1.default.deleteUserByEmail);
        server.patch("/email/:email/:age", { preValidation: validationn_1.default.byEmailAge, preHandler: auth_1.default }, userController_1.default.updateAgeByEmail);
        server.post("/signin", { preValidation: validationn_1.default.signInVal }, userController_1.default.signIn);
        server.get("/id/:id", { preValidation: validationn_1.default.byId, preHandler: auth_1.default }, userController_1.default.getUserById);
        server.delete("/", { preHandler: auth_1.default }, userController_1.default.deleteAllUsers);
    });
}
exports.default = userRoutes;
