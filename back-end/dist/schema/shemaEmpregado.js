"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaCriarEmpregado = void 0;
const zod_1 = __importDefault(require("zod"));
exports.schemaCriarEmpregado = zod_1.default.object({
    ds_nome: zod_1.default.string('O nome do empregado é obrigatório!').min(2, 'Informe um núimero válido'),
    ds_email: zod_1.default.string('E-mail obrigatório!').min(2, 'Informe um e-mail válido'),
    dt_nascimento: zod_1.default.string('A data de nascimento é obrigatório!').min(2, 'Informe uma data válida.'),
    ds_profissao: zod_1.default.string('A profissão é obrigatória!').min(2, 'Informe uma profissão válida.'),
    vl_salario: zod_1.default.number('O sálario é obrigatório!'),
    dt_admissao: zod_1.default.string('A data de admissão é obrigatória!').min(2, 'Informe uma data válida.'),
    role: zod_1.default.string('O cargo é obrigatório!').min(2, 'O cargo é obrigatório.'),
    ds_password: zod_1.default.string('A senha obrigatório!').min(8, 'Informe uma senha válida.'),
    ds_cpf: zod_1.default.string('O CPF é obrigatório!').min(2, 'Informe um CPF válido.'),
});
