import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '../use-cases/errors/resource-not-found-error'
import { makeUpdateProductUseCase } from '../use-cases/factories/make-update-product-use-case'

export async function updateProduct(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const updateProductBodySchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    price: z.number().optional(),
    quantity: z.number().optional(),
  })

  const { name, description, price, quantity } = updateProductBodySchema.parse(
    request.body,
  )
  const { id: product_id } = updateParamsSchema.parse(request.params)

  const udpateProductUseCase = makeUpdateProductUseCase()

  try {
    const product = await udpateProductUseCase.execute({
      product_id,
      name,
      description,
      price,
      quantity,
    })

    return reply.status(200).send(product)
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      })
    }
  }
}
