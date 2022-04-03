import urlJoin from 'url-join'
import {PostOauthTokenRequest, PostOauthTokenResponse} from '~/types/api-types'
import { Base64 } from 'js-base64'
import { ApiDriver } from '~/app/drivers/api-driver'
import { GraphQLClient } from 'graphql-request'
import { getSdk, SdkFunctionWrapper }from './generated/api-gql'

export class ApiGateway {
  private clientCredentialAccessToken = ''

  constructor(
    private apiDriver: ApiDriver,
    private gqlClient: GraphQLClient,
    private clientId: string,
    private clientSecret: string,
    ) {
  }

  public async postOauthToken(req: PostOauthTokenRequest): Promise<PostOauthTokenResponse> {
    const form = new FormData()
    form.append("grant_type", req.grantType)
    form.append("scope", req.scope)
    if (req.code) {
      form.append("code", req.code)
    }
    if (req.redirectUrl){
      form.append("redirect_url", req.redirectUrl)
    }
    if (req.refreshToken) {
      form.append("refresh_token", req.refreshToken)
    }
    if (req.state) {
      form.append("state", req.state)
    }

    try {
      const res = await this.apiDriver.request('oauth/v2/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${this.basicAuthValue()}`,
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

  public graphQLAsServer() {
    const func: SdkFunctionWrapper =  async <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>): Promise<T> => {
      return action({'Authorization': `Bearer ${this.clientCredentialAccessToken}`})
    }

    return getSdk(this.gqlClient, func)
  }

  public setClientCredentialAccessToken(token: string) {
    this.clientCredentialAccessToken = token
  }

  private basicAuthValue(): string {
    const pass = Base64.encode(`${this.clientId}:${this.clientSecret}`)
    return `Basic ${pass}`
  }
}
