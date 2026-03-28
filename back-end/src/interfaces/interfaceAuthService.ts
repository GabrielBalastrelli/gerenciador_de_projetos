export interface IAuthService {
  login(senhaLogin: string, email: string): Promise<boolean>;
}
