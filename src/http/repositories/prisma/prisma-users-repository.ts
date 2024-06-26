import { prisma } from '@/lib/prisma'
import {
  CreateStockIdRequest,
  CreateUserRequest,
  UsersRepository,
} from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async create({ data }: CreateUserRequest) {
    const user = await prisma.user.create({
      data,
      select: {
        id: true,
        name: true,
        email: true,
        stock_id: true,
      },
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
      select: {
        id: true,
        name: true,
        email: true,
        stock_id: true,
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
      select: {
        id: true,
        name: true,
        email: true,
        stock_id: true,
      },
    })

    return user
  }
}
