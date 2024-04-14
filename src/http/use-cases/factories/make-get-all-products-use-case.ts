import { PrismaProductsRepository } from '@/http/repositories/prisma/prisma-products-repository'
import { GetAllProductsUseCase } from '../products/get-all'

export function makeGetAllProductsUseCase() {
  const prismaProductsRepository = new PrismaProductsRepository()
  const getAllProductsUseCase = new GetAllProductsUseCase(
    prismaProductsRepository,
  )

  return getAllProductsUseCase
}
