import { AuthRepository } from '../repositories/auth-repository'

export class AuthClientUsecase {
  constructor (
        private authRepo: AuthRepository,
  ) {}

  public async authorizationCode (code: string, state: string) {
    await this.authRepo.authorizationCode(code, state)
  }
}
