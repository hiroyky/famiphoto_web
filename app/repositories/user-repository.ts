import { ApiGateway } from '~/app/drivers/api-gateway'

export class UserRepository {
  constructor (private apiGateway: ApiGateway) {
  }

  public async createUser (userId:string, name: string, password: string) {
    const client = this.apiGateway.graphQLAsServer()
    const res = await client.createUser({ userId, name, password })
  }
}
