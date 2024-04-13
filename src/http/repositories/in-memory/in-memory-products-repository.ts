import { Product } from '@prisma/client'
import {
  CreateProductRequest,
  ProductsRepository,
  UpdateProductRequest,
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

  async updateProduct({
    product_id,
    name,
    description,
    price,
    quantity,
  }: UpdateProductRequest) {
    const product = this.items.find((product) => product.id === product_id)
    const productIndex = this.items.findIndex(
      (product) => product.id === product_id,
    )

    const updatedProduct = {
      id: product?.id || '',
      name: name || product?.name || '',
      description: description || product?.description || '',
      price: price || product?.price || 0,
      quantity: quantity || product?.quantity || 0,
      created_at: new Date(),
      updated_at: new Date(),
      stock_id: product?.stock_id || '',
    }

    this.items[productIndex] = updatedProduct

    return updatedProduct
  }

  async findById(product_id: string) {
    const product = this.items.find((product) => product.id === product_id)

    if (!product) {
      return null
    }

    return product
  }
}
