export function validarSenha(senha: string): boolean {
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
