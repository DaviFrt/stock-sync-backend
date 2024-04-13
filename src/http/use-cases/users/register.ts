import { hash } from 'bcryptjs'
import { User } from '@prisma/client'
import { UsersRepository } from '../../repositories/users-repository'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

interface RegisterUseCaseReply {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseReply> {
    const password_hash = await hash(password, 6)
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const data = {
      name,
      email,
      password_hash,
    }

    const user = await this.usersRepository.create({ data })

    return { user }
  }
}
