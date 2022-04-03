import { ApiGateway } from '~/app/drivers/api-gateway'

export class AuthRepository {
  constructor (
    private apiGateway: ApiGateway,
    private clientCredentialRefreshToken: string,
  ) {
  }

  public async refreshClientCredentialAccessToken () {
    const res = await this.apiGateway.postOauthToken({
      grantType: 'client_credentials',
      scope: 'admin',
      refreshToken: this.clientCredentialRefreshToken,
    })
    this.apiGateway.setClientCredentialAccessToken(res.accessToken)
  }
}
