import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '../use-cases/errors/resource-not-found-error'
import { makeDeleteProductUseCase } from '../use-cases/factories/make-delete-product-use-case'

export async function deleteProduct(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteProductParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id: product_id } = deleteProductParamsSchema.parse(request.params)

  const deleteProductUseCase = makeDeleteProductUseCase()

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
