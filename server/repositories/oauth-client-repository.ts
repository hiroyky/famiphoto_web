import { ApiGateway } from '../drivers/api-gateway'

export class OauthClientRepository {
  constructor (
    private apiGateway: ApiGateway,
  ) {
  }

  public async authorizationCode (code: string, redirectUri: string) {
    const res = await this.apiGateway.postOauthToken({
      code,
      grantType: 'authorization_code',
      redirectUri,
    })
    return {
      accessToken: res.accessToken,
      expireIn: res.expireIn,
      refreshToken: res.refreshToken!,
    }
  }

  public async refreshToken (refreshToken: string) {
    const res = await this.apiGateway.postOauthToken({
      grantType: 'refresh_token',
      refreshToken,
    })
    return {
      accessToken: res.accessToken,
      expireIn: res.expireIn,
    }
  }
}
