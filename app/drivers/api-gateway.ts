import { Base64 } from 'js-base64'
import { GraphQLClient } from 'graphql-request'
import { getSdk, SdkFunctionWrapper } from './generated/api-gql'
import { ApiDriver, ApiError } from '~/app/drivers/api-driver'
import { AuthorizationCodeResponse, PostOauthTokenRequest, PostOauthTokenResponse } from '~/types/api-types'

export class ApiGateway {
  constructor (
    private apiDriver: ApiDriver,
    private gqlClient: GraphQLClient,
  ) {
  }

  public graphQL () {
    const func: SdkFunctionWrapper = async <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>): Promise<T> => {
      // TODO アクセストークンの更新処理
      return action({ Authorization: 'Bearer <User AccessToken>' })
    }
    return getSdk(this.gqlClient, func)
  }

  public async authoriationCode (code:string, state: string): Promise<AuthorizationCodeResponse> {
    const res = await this.apiDriver.request('/auth/redirect', {
      method: 'POST',
      headers: {
        'Content-Type': 'applicaiton/json',
      },
      body: JSON.stringify({ code, state }),
    })
    return await res.json()
  }
}
