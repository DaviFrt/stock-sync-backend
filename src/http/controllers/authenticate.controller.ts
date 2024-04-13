import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaUsersRepository } from '../repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '../use-cases/users/authenticate'
import { InvalidCredentialsError } from '../use-cases/errors/invalid-credentials-error'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  console.log(email, password)

  try {
    const prismaUsersRepository = new PrismaUsersRepository()
    const authenticateUsecase = new AuthenticateUseCase(prismaUsersRepository)

    const { user } = await authenticateUsecase.execute({ email, password })

    const token = await reply.jwtSign({
      sign: {
        sub: user.id,
      },
    })

    return reply.status(200).send({ token })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      reply.status(409).send({
        message: error.message,
      })
    }

    throw error
  }
}