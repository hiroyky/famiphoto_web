import { ApiGateway } from '~/app/drivers/api-gateway'

export class AuthRepository {
  constructor (
    private apiGateway: ApiGateway,
  ) {
  }

}
