import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { UnauthorizedError } from '../use-cases/errors/unauthorized-error'
import { makeCreateStockUseCase } from '../use-cases/factories/make-create-stock-use-case'

export async function createStock(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const user_id = request.user.sign.sub

  const createBodySchema = z.object({
    name: z.string(),
  })

  const { name } = createBodySchema.parse(request.body)

  try {
    const createUseCase = makeCreateStockUseCase()

    await createUseCase.execute({ name, user_id })

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
