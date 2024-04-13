import { ProductsRepository } from '@/http/repositories/products-repository'
import { UsersRepository } from '@/http/repositories/users-repository'
import { UnauthorizedError } from '../errors/unauthorized-error'

interface CreateProductUseCaseRequest {
  name: string
  description?: string
  price: number
  quantity: number
  user_id: string
}

export class CreateProductUseCase {
  constructor(
    private productsRepository: ProductsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    name,
    description,
    price,
    quantity,
    user_id,
  }: CreateProductUseCaseRequest) {
    const user = await this.usersRepository.findById(user_id)

    if (!user || user.stock_id === null) {
      throw new UnauthorizedError()
    }

    const data = {
      name,
      description,
      price,
      quantity,
    }

    const product = await this.productsRepository.create({
      data,
      stock_id: user.stock_id,
    })

    return product
  }
}
