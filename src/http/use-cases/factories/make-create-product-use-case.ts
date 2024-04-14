import { PrismaProductsRepository } from '@/http/repositories/prisma/prisma-products-repository'
import { PrismaUsersRepository } from '@/http/repositories/prisma/prisma-users-repository'
import { CreateProductUseCase } from '../products/create'

export function makeCreateProductUseCase() {
  const prismaProductsRepository = new PrismaProductsRepository()
  const prismaUsersRepository = new PrismaUsersRepository()
  const createProductUseCase = new CreateProductUseCase(
    prismaProductsRepository,
    prismaUsersRepository,
  )

  return createProductUseCase
}
