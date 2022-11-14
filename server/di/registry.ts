import { ApiDriver } from '../drivers/api-driver'
import { ApiGateway } from '../drivers/api-gateway'
import { OauthClientRepository } from '../repositories/oauth-client-repository'
import { OauthClientUsecase } from '../usecases/oauth-client-usecase'

function newApiDriver () {
  const apiBaseUrl = process.env.API_BASE_URL
  if (apiBaseUrl === undefined) {
    throw new Error('env: api base url is invalid')
  }
  return new ApiDriver(apiBaseUrl)
}

function newApiGateway () {
  const clientId = process.env.CLIENT_ID
  if (clientId === undefined) {
    throw new Error('env: client id is invalid')
  }
  const clientSecret = process.env.CLIENT_SECRET
  if (clientSecret === undefined) {
    throw new Error('env: client secret is invalid')
  }

  return new ApiGateway(newApiDriver(), clientId, clientSecret)
}

export function newOauthClientUsecase () {
  const redirectUri = process.env.LOGIN_REDIRECT_URL
  if (redirectUri === undefined) {
    throw new Error('env: redirect uri is invalid')
  }
  return new OauthClientUsecase(new OauthClientRepository(newApiGateway()), redirectUri)
}
