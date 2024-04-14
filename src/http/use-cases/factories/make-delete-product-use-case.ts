import { PrismaProductsRepository } from '@/http/repositories/prisma/prisma-products-repository'
import { DeleteProductByIdUseCase } from '../products/delete-by-id'

export function makeDeleteProductUseCase() {
  const prismaProductsRepository = new PrismaProductsRepository()
  const deleteProductUseCase = new DeleteProductByIdUseCase(
    prismaProductsRepository,
  )

  return deleteProductUseCase
}
