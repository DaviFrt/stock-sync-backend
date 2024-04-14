import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { UnauthorizedError } from '../use-cases/errors/unauthorized-error'
import { makeCreateProductUseCase } from '../use-cases/factories/make-create-product-use-case'

export async function createProduct(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const user_id = request.user.sign.sub

  const createBodySchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    price: z.number(),
    quantity: z.number(),
  })

  const { name, description, price, quantity } = createBodySchema.parse(
    request.body,
  )

  try {
    const createProductUseCase = makeCreateProductUseCase()

    await createProductUseCase.execute({
      name,
      description,
      price,
      quantity,
      user_id,
    })

    return reply.status(201).send()
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      reply.status(401).send({
        message: error.message,
      })
    }

    throw error
  }
}
