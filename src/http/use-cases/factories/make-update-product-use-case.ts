import { PrismaProductsRepository } from '@/http/repositories/prisma/prisma-products-repository'
import { UpdateProductUseCase } from '../products/update'

export function makeUpdateProductUseCase() {
  const prismaProductsRepository = new PrismaProductsRepository()
  const udpateProductUseCase = new UpdateProductUseCase(
    prismaProductsRepository,
  )

  return udpateProductUseCase
}
