import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaProductsRepository } from '../repositories/prisma/prisma-products-repository'
import { ResourceNotFoundError } from '../use-cases/errors/resource-not-found-error'
import { DeleteProductByIdUseCase } from '../use-cases/products/delete-by-id'

export async function deleteProduct(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteProductParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id: product_id } = deleteProductParamsSchema.parse(request.params)

  const prismaProductsRepository = new PrismaProductsRepository()
  const deleteProductUseCase = new DeleteProductByIdUseCase(
    prismaProductsRepository,
  )

  try {
    await deleteProductUseCase.execute({
      product_id,
    })

    return reply.status(200).send()
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      })
    }
  }
}
