import { WebStorage } from '../drivers/web-storage'
import { ApiGateway } from '~/app/drivers/api-gateway'

export class AuthRepository {
  constructor (
    private apiGateway: ApiGateway,
    private webStorage: WebStorage,
  ) {
  }

  authorizationCode (code: string, state: string) {
    return this.apiGateway.authoriationCode(code, state)
  }

  saveAuthTokens (accessToken: string, refreshToken: string) {
    this.webStorage.setAccessToken(accessToken)
    this.webStorage.setRefreshToken(refreshToken)
  }
}
