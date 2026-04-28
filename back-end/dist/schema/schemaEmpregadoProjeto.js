"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaEmpregadoProjeto = void 0;
const zod_1 = __importDefault(require("zod"));
exports.schemaEmpregadoProjeto = zod_1.default.object({
    id_empregado: zod_1.default.string().optional(),
    id_projeto: zod_1.default.string().optional(),
});
