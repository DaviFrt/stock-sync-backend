import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaProductsRepository } from '../repositories/prisma/prisma-products-repository'
import { PrismaUsersRepository } from '../repositories/prisma/prisma-users-repository'
import { GetAllProductsUseCase } from '../use-cases/products/get-all'
import { GetUserUseCase } from '../use-cases/users/get-user'
import { ResourceNotFoundError } from '../use-cases/errors/resource-not-found-error'

export async function getAllProducts(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const user_id = request.user.sign.sub

  const prismaProductsRepository = new PrismaProductsRepository()
  const prismaUsersRepository = new PrismaUsersRepository()
  const getUserUseCase = new GetUserUseCase(prismaUsersRepository)
  const getAllProductsUseCase = new GetAllProductsUseCase(
    prismaProductsRepository,
  )

  try {
    const { user } = await getUserUseCase.execute({
      user_id,
    })

    const products = await getAllProductsUseCase.execute({
      stock_id: user.stock_id,
    })

    return reply.status(200).send(products)
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      })
    }
  }
}
