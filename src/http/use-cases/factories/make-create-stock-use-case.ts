import { PrismaStocksRepository } from '@/http/repositories/prisma/prisma-stocks-repository'
import { PrismaUsersRepository } from '@/http/repositories/prisma/prisma-users-repository'
import { CreateStockUseCase } from '../stocks/create'

export function makeCreateStockUseCase() {
  const prismaStocksRepository = new PrismaStocksRepository()
  const prismaUsersRepository = new PrismaUsersRepository()
  const createUseCase = new CreateStockUseCase(
    prismaStocksRepository,
    prismaUsersRepository,
  )

  return createUseCase
}
