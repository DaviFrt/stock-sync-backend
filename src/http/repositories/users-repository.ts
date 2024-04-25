import { Prisma } from '@prisma/client'

export interface CreateUserRequest {
  data: Prisma.UserCreateInput
  stock_id?: string
}

export interface CreateStockIdRequest {
  user_id: string
  stock_id: string
}

interface UserResponse {
  id: string
  name: string
  email: string
  stock_id: string | null
}
export interface UsersRepository {
  create({ data, stock_id }: CreateUserRequest): Promise<UserResponse>
  createStockId({
    user_id,
    stock_id,
  }: CreateStockIdRequest): Promise<UserResponse>
  findByEmail(email: string): Promise<UserResponse | null>
  findById(user_id: string): Promise<UserResponse | null>
}
