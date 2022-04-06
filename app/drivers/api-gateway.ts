import urlJoin from 'url-join'
import { Base64 } from 'js-base64'
import { GraphQLClient } from 'graphql-request'
import { getSdk, SdkFunctionWrapper } from './generated/api-gql'
import { ApiDriver, ApiError } from '~/app/drivers/api-driver'
import { PostOauthTokenRequest, PostOauthTokenResponse } from '~/types/api-types'

export class ApiGateway {
  private clientCredentialAccessToken = ''

  constructor (
    private apiDriver: ApiDriver,
    private gqlClient: GraphQLClient,
    private clientId: string,
    private clientSecret: string,
    private clientCredentialRefreshToken: string,
  ) {
  }

  public async postOauthToken (req: PostOauthTokenRequest): Promise<PostOauthTokenResponse> {
    const form = new FormData()
    form.append('grant_type', req.grantType)
    form.append('scope', req.scope)
    if (req.code) {
      form.append('code', req.code)
    }
    if (req.redirectUrl) {
      form.append('redirect_url', req.redirectUrl)
    }
    if (req.refreshToken) {
      form.append('refresh_token', req.refreshToken)
    }
    if (req.state) {
      form.append('state', req.state)
    }

    try {
      const res = await this.apiDriver.request('oauth/v2/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${this.basicAuthValue()}`,
        },
        body: form,
        mode: 'cors',
        credentials: 'include',
        cache: 'no-cache',
      })

      const body = await res.json()
      return {
        accessToken: body.access_token,
        expireIn: body.expire_in,
      }
    } catch (err) {
      throw err
    }
  }

  public graphQLAsServerCC () {
    const func: SdkFunctionWrapper = async <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>): Promise<T> => {
      // TODO アクセストークンの更新処理
      return action({ Authorization: `Bearer ${this.clientCredentialAccessToken}` })
    }
    console.log('gql: ', this.clientId, this.clientSecret, this.clientCredentialRefreshToken)
    return getSdk(this.gqlClient, func)
  }

  private async refreshClientCredentialAccessToken () {
    const res = await this.postOauthToken({
      grantType: 'client_credentials',
      scope: 'admin',
      refreshToken: this.clientCredentialRefreshToken,
    })
    this.clientCredentialAccessToken = res.accessToken
  }

  private async requestAsClientCredential(path: string, init?: RequestInit) {
    if (this.clientCredentialAccessToken === '') {
      await this.refreshClientCredentialAccessToken()
    }

    try {
      return await this.apiDriver.request(path, init)
    } catch(err) {
      if (err instanceof ApiError){
        // 認証エラーの場合は、クライアントクレデンシャル認証のアクセストークンを更新して再挑戦する。
        if (err.errorCode === 'UnauthorizedError') {
          await this.refreshClientCredentialAccessToken()
          return await this.apiDriver.request(path, init)
        }
      }
      throw err
    }
  }

  private basicAuthValue (): string {
    const pass = Base64.encode(`${this.clientId}:${this.clientSecret}`)
    return `Basic ${pass}`
  }
}
