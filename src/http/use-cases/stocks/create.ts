import { StocksRepository } from '@/http/repositories/stocks-repository'
import { Stock } from '@prisma/client'
import { UnauthorizedError } from '../errors/unauthorized-error'
import { UsersRepository } from '@/http/repositories/users-repository'

interface CreateStockUseCaseRequest {
  user_id: string
  name: string
}

interface CreateStockUseCaseReply {
  stock: Stock
}

export class CreateStockUseCase {
  constructor(
    private stocksRepository: StocksRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    name,
    user_id,
  }: CreateStockUseCaseRequest): Promise<CreateStockUseCaseReply> {
    const user = await this.usersRepository.findById(user_id)

    if (!user || user.stock_id !== null) {
      throw new UnauthorizedError()
    }

    const stock = await this.stocksRepository.create({
      name,
    })

    await this.usersRepository.createStockId({ user_id, stock_id: stock.id })

    return { stock }
  }
}
