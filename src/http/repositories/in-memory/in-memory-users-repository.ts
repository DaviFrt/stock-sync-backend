import { User } from '@prisma/client'
import {
  CreateStockIdRequest,
  CreateUserRequest,
  UsersRepository,
} from '../users-repository'
import { randomUUID } from 'crypto'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async create({ data, stock_id }: CreateUserRequest) {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
      stock_id: stock_id || null,
    }

    this.items.push(user)

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async findById(user_id: string) {
    const user = this.items.find((item) => item.id === user_id)

    if (!user) {
      return null
    }

    return user
  }

  async createStockId({ user_id, stock_id }: CreateStockIdRequest) {
    const userIndex = this.items.findIndex((item) => item.id === user_id)
    const user = this.items[userIndex]

    user.stock_id = stock_id

    return user
  }
}
