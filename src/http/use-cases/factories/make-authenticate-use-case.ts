import { PrismaUsersRepository } from '@/http/repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '../users/authenticate'

export function makeAuthenticateUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const authenticateUsecase = new AuthenticateUseCase(prismaUsersRepository)

  return authenticateUsecase
}
