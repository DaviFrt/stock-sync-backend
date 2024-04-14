import { PrismaUsersRepository } from '@/http/repositories/prisma/prisma-users-repository'
import { GetUserUseCase } from '../users/get-user'

export function makeGetUserUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const getUserUseCase = new GetUserUseCase(prismaUsersRepository)

  return getUserUseCase
}
