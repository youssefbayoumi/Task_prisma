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
const fastify_1 = __importDefault(require("fastify"));
const routes_1 = __importDefault(require("./Routes/routes"));
const index_config_1 = __importDefault(require("./Config/index.config"));
const app = (0, fastify_1.default)();
app.register(routes_1.default, { prefix: "api/users" });
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield app.listen({ port: index_config_1.default.PORT, host: '0.0.0.0' });
            console.log(`Server is running on port ${index_config_1.default.PORT}`);
        }
        catch (e) {
            console.error(e);
            process.exit(1);
        }
    });
}
main();
