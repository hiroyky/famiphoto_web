import { UserRepository } from '../repositories/user-repository'

export class UserCreationUseCase {
  constructor (private userRepo: UserRepository) {
  }

  public async createUser (userId: string, name: string, password: string) {
    await this.userRepo.createUser(userId, name, password)
  }
}
