"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarCpf = validarCpf;
const cpf_cnpj_validator_1 = require("cpf-cnpj-validator");
function validarCpf(CPF) {
    return cpf_cnpj_validator_1.cpf.isValid(CPF);
}
