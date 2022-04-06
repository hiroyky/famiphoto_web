import { ApiDriver } from '~/app/drivers/api-driver'
import { ApiGateway } from '~/app/drivers/api-gateway'
import { GraphQLClient } from 'graphql-request'
import { AuthRepository } from '~/app/repositories/auth-repository'
import { UserRepository } from '~/app/repositories/user-repository'
import { UserCreationUseCase } from '../usecases/user-creation-usecase'

let apiDriver: ApiDriver | null = null
let apiGateway: ApiGateway | null = null
let authRepository: AuthRepository | null = null
let userRepository: UserRepository | null = null
let userCreateionUseCase: UserCreationUseCase | null = null

function newApiDriver() {
  if (apiDriver != null) {
    return apiDriver
  }
  apiDriver = new ApiDriver(`/api`)
  return apiDriver
}

function newApiGateway() {
  if (apiGateway != null) {
    return apiGateway
  }

  const clientId = process.env.CLIENT_ID || ''
  const clientSecret = process.env.CLIENT_SECRET|| ''
  const ccRefreshToken = process.env.CLIENT_CREDENTIAL_REFRESH_TOKEN|| ''
  console.log(clientId, clientSecret, ccRefreshToken)
  if (!clientId || !clientSecret || !ccRefreshToken) {
  //  throw new Error('client id, client or client redential refresh token secret is null')
  }

  apiGateway = new ApiGateway(
    newApiDriver(),
    new GraphQLClient('/api/graphql'),
    clientId,
    clientSecret,
    ccRefreshToken
  )
  return apiGateway
}

function newAuthRepository() {
  if (authRepository != null) {
    return authRepository
  }

  authRepository = new AuthRepository(newApiGateway())
  return authRepository
}

function newUserRepository() {
  if (userRepository != null) {
    return userRepository
  }

  userRepository = new UserRepository(newApiGateway())
  return userRepository
}

export function newUseCreateionUseCase() {
  if (userCreateionUseCase != null) {
    return userCreateionUseCase
  }
  userCreateionUseCase = new UserCreationUseCase(newUserRepository())
  return userCreateionUseCase
}