export interface IGestaoSenha {
  criptografarSenha(password: string): Promise<string>;
  compararSenha(password: string, hash: string): Promise<boolean>;
}
