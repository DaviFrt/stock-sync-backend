import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaProductsRepository } from '../repositories/prisma/prisma-products-repository'
import { CreateProductUseCase } from '../use-cases/products/create'
import { UnauthorizedError } from '../use-cases/errors/unauthorized-error'
import { PrismaUsersRepository } from '../repositories/prisma/prisma-users-repository'

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
    const prismaProductsRepository = new PrismaProductsRepository()
    const prismaUsersRepository = new PrismaUsersRepository()
    const createProductUseCase = new CreateProductUseCase(
      prismaProductsRepository,
      prismaUsersRepository,
    )

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
