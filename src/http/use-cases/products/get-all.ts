import { ProductsRepository } from '@/http/repositories/products-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface GetAllUseCaseRequest {
  stock_id: string | null
}

export class GetAllProductsUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({ stock_id }: GetAllUseCaseRequest) {
    if (stock_id === null) {
      throw new ResourceNotFoundError()
    }

    const products = await this.productsRepository.getAll(stock_id)

    return products
  }
}
