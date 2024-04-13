import { prisma } from '@/lib/prisma'
import {
  CreateProductRequest,
  ProductsRepository,
  UpdateProductRequest,
} from '../products-repository'

export class PrismaProductsRepository implements ProductsRepository {
  async create({ data, stock_id }: CreateProductRequest) {
    const product = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        quantity: data.quantity,
        stock_id,
      },
    })

    return product
  }

  async getAll(stock_id: string) {
    const products = await prisma.product.findMany({
      where: {
        stock_id,
      },
    })

    return products
  }

  async findById(product_id: string) {
    const product = await prisma.product.findUnique({
      where: {
        id: product_id,
      },
    })

    return product
  }

  async updateProduct(data: UpdateProductRequest) {
    const product = await prisma.product.update({
      where: {
        id: data.product_id,
      },
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        quantity: data.quantity,
      },
    })

    return product
  }
}
