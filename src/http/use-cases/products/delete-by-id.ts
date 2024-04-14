import { ProductsRepository } from '@/http/repositories/products-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface DeleteProductByIdUseCaseRequest {
  product_id: string
}

export class DeleteProductByIdUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({ product_id }: DeleteProductByIdUseCaseRequest) {
    const product = await this.productsRepository.findById(product_id)

    if (!product) {
      throw new ResourceNotFoundError()
    }

    const products =
      await this.productsRepository.deleteOneProductById(product_id)

    return products
  }
}
