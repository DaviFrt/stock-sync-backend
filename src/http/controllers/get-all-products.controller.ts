import { FastifyReply, FastifyRequest } from 'fastify'
import { ResourceNotFoundError } from '../use-cases/errors/resource-not-found-error'
import { makeGetUserUseCase } from '../use-cases/factories/make-get-user-use-case'
import { makeGetAllProductsUseCase } from '../use-cases/factories/make-get-all-products-use-case'

export async function getAllProducts(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const user_id = request.user.sign.sub

  const getUserUseCase = makeGetUserUseCase()
  const getAllProductsUseCase = makeGetAllProductsUseCase()

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
