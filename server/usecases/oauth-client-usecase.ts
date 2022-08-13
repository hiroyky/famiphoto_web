import { OauthClientRepository } from '../repositories/oauth-client-repository'

export class OauthClientUsecase {
  constructor (
    private oauthClientRepo: OauthClientRepository,
    private redirectUri: string,
  ) {}

  public async authorizationCode (code: string, now: Date) {
    const res = await this.oauthClientRepo.authorizationCode(
      code,
      this.redirectUri,
    )
    return {
      accessToken: res.accessToken,
      refreshToken: res.refreshToken,
      expireAt: res.expireIn + (now.getTime() / 1000),
    }
  }

  public isExpired (expireAt: Number, now:Date): boolean {
    return expireAt < now.getTime() / 1000
  }

  public async refreshToken (refreshToken: string, now: Date) {
    const res = await this.oauthClientRepo.refreshToken(refreshToken)
    return {
      accessToken: res.accessToken,
      expireAt: res.expireIn + (now.getTime() / 1000),
    }
  }
}
