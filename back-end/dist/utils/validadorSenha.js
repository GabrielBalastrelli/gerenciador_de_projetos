"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarSenha = validarSenha;
function validarSenha(senha) {
    if (senha.length < 8) {
        return false;
    }
    let regex = /[@!$%*]/g;
    if (!senha.match(regex)) {
        return false;
    }
    regex = /[0-9]/g;
    if (!senha.match(regex)) {
        return false;
    }
    return true;
}
