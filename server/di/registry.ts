import { ApiDriver } from '../drivers/api-driver'
import { ApiGateway } from '../drivers/api-gateway'
import { AuthUseCase } from '../usecases/auth_usecase'

function newApiDriver () {
  const apiBaseUrl = process.env.API_BASE_URL
  if (apiBaseUrl === undefined) {
    throw new Error('env: api base url is invalid')
  }
  return new ApiDriver(apiBaseUrl)
}

function newApiGateway () {
  return new ApiGateway(newApiDriver())
}

export function newAuthUseCase (): AuthUseCase {
  return new AuthUseCase(newApiGateway())
}
