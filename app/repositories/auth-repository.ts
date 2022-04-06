import { ApiGateway } from '~/app/drivers/api-gateway'
import { WebStorage } from '../drivers/web-storage'

export class AuthRepository {
  constructor (
    private apiGateway: ApiGateway,
    private webStorage: WebStorage,
  ) {
  }

  authorizationCode(code: string, state: string) {
    return this.apiGateway.authoriationCode(code, state)
  }

  saveAuthTokens(accessToken: string, refreshToken: string) {
    this.webStorage.setAccessToken(accessToken)
    this.webStorage.setRefreshToken(refreshToken)
  }
}
