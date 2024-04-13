import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { CreateStockIdRequest, UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  async findByEmail(email: string) {
    const user = prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async findById(user_id: string) {
    const user = prisma.user.findUnique({
      where: {
        id: user_id,
      },
    })

    return user
  }

  async createStockId({ user_id, stock_id }: CreateStockIdRequest) {
    const user = prisma.user.update({
      where: {
        id: user_id,
      },
      data: {
        stock_id,
      },
    })

    return user
  }
}
