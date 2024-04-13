import { ProductsRepository } from '@/http/repositories/products-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface UpdateProductUseCaseRequest {
  name?: string
  description?: string
  price?: number
  quantity?: number
  product_id: string
}

export class UpdateProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    name,
    description,
    price,
    quantity,
    product_id,
  }: UpdateProductUseCaseRequest) {
    const data = { name, description, price, quantity, product_id }

    const product = await this.productsRepository.findById(product_id)

    if (!product) {
      throw new ResourceNotFoundError()
    }

    const updatedProduct = await this.productsRepository.updateProduct(data)

    return updatedProduct
  }
}
