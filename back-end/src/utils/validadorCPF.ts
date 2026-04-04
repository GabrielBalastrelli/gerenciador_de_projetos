import { cpf } from 'cpf-cnpj-validator';

export function validarCpf(CPF: string): boolean {
  return cpf.isValid(CPF);
}
