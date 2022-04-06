import { ApiDriver } from '~/app/drivers/api-driver'
import { ApiGateway } from '~/app/drivers/api-gateway'
import { GraphQLClient } from 'graphql-request'
import { AuthRepository } from '~/app/repositories/auth-repository'
import { UserRepository } from '~/app/repositories/user-repository'
import { UserCreationUseCase } from '../usecases/user-creation-usecase'
import { AuthClientUsecase } from '../usecases/auth-client-usecase'
import { WebStorage } from '../drivers/web-storage'

let apiDriver: ApiDriver | null = null
let apiGateway: ApiGateway | null = null
let authRepository: AuthRepository | null = null
let userRepository: UserRepository | null = null
let userCreateionUseCase: UserCreationUseCase | null = null
let auhtClientUseCase: AuthClientUsecase | null = null

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

  apiGateway = new ApiGateway(
    newApiDriver(),
    new GraphQLClient('/api/graphql'),
  )
  return apiGateway
}

function newWebStorage() {
  return new WebStorage()
}

function newAuthRepository() {
  if (authRepository != null) {
    return authRepository
  }

  authRepository = new AuthRepository(newApiGateway(), newWebStorage())
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

export function newAuthUseCase() {
  if (auhtClientUseCase != null) {
    return auhtClientUseCase
  }
  auhtClientUseCase = new AuthClientUsecase(newAuthRepository())
  return auhtClientUseCase
}