import { Base64 } from 'js-base64'
import FormData from 'form-data'
import { ApiDriver } from './api-driver'
import { PostOauthTokenRequest, PostOauthTokenResponse } from '~/types/api-types'

export class ApiGateway {
  constructor (
    private apiDriver: ApiDriver,
    private clientId: string,
    private clientSecret: string,
  ) { }

  public async postOauthToken (req: PostOauthTokenRequest): Promise<PostOauthTokenResponse> {
    const form = new URLSearchParams()
    form.append('grant_type', req.grantType)
    if (req.scope) {
      form.append('scope', req.scope)
    }
    if (req.code) {
      form.append('code', req.code)
    }
    if (req.redirectUri) {
      form.append('redirect_uri', req.redirectUri)
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
          Authorization: this.basicAuthValue(),
        },
        body: form,
      })

      const body: any = await res.json()
      return {
        accessToken: body.access_token,
        expireIn: body.expires_in,
        refreshToken: body.refresh_token,
      }
    } catch (err) {
      throw err
    }
  }

  private basicAuthValue (): string {
    const pass = Base64.encode(`${this.clientId}:${this.clientSecret}`)
    return `Basic ${pass}`
  }
}
