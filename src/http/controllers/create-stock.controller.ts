import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaStocksRepository } from '../repositories/prisma/prisma-stocks-repository'
import { CreateStockUseCase } from '../use-cases/stocks/create'
import { UnauthorizedError } from '../use-cases/errors/unauthorized-error'
import { PrismaUsersRepository } from '../repositories/prisma/prisma-users-repository'

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
    const prismaStocksRepository = new PrismaStocksRepository()
    const prismaUsersRepository = new PrismaUsersRepository()
    const createUseCase = new CreateStockUseCase(
      prismaStocksRepository,
      prismaUsersRepository,
    )

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
