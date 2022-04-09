import { AuthRepository } from '../repositories/auth-repository'

export class AuthClientUsecase {
  constructor (
        private authRepo: AuthRepository,
  ) {}

  public async authorizationCode (code: string, state: string) {
    const {
      accessToken,
      refreshToken,
    } = await this.authRepo.authorizationCode(code, state)

    this.authRepo.saveAuthTokens(accessToken, refreshToken)
  }
}
