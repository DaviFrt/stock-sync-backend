import { prisma } from '@/lib/prisma'
import {
  CreateProductRequest,
  ProductsRepository,
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
}
