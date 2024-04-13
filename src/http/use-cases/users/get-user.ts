import { User } from '@prisma/client'
import { UsersRepository } from '../../repositories/users-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface GetUserUseCaseRequest {
  user_id: string
}

interface GetUserUseCaseReply {
  user: User
}

export class GetUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    user_id,
  }: GetUserUseCaseRequest): Promise<GetUserUseCaseReply> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return { user }
  }
}
