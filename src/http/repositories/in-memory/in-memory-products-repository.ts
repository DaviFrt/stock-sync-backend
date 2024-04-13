import { Product } from '@prisma/client'
import {
  CreateProductRequest,
  ProductsRepository,
} from '../products-repository'
import { randomUUID } from 'crypto'

export class InMemoryProductsRepository implements ProductsRepository {
  private items: Product[] = []

  async create({ data, stock_id }: CreateProductRequest) {
    const product = {
      id: data.id || randomUUID(),
      name: data.name,
      description: data.description || '',
      price: data.price,
      quantity: data.quantity,
      stock_id,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.items.push(product)

    return product
  }

  async getAll(stock_id: string) {
    const products = this.items.filter(
      (product) => product.stock_id === stock_id,
    )

    return products
  }
}
