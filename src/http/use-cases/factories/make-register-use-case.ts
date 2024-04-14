import { PrismaUsersRepository } from '@/http/repositories/prisma/prisma-users-repository'
import { RegisterUseCase } from '../users/register'

export function makeRegisterUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const registerUseCase = new RegisterUseCase(prismaUsersRepository)

  return registerUseCase
}
