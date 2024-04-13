import { Prisma, User } from '@prisma/client'

export interface CreateUserRequest {
  data: Prisma.UserCreateInput
  stock_id?: string
}

export interface CreateStockIdRequest {
  user_id: string
  stock_id: string
}
export interface UsersRepository {
  create({ data, stock_id }: CreateUserRequest): Promise<User>
  createStockId({ user_id, stock_id }: CreateStockIdRequest): Promise<User>
  findByEmail(email: string): Promise<User | null>
  findById(user_id: string): Promise<User | null>
}
