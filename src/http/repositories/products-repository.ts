import { Prisma, Product } from '@prisma/client'

export interface CreateProductRequest {
  data: Prisma.ProductCreateWithoutStockInput
  stock_id: string
}

export interface ProductsRepository {
  create({ data, stock_id }: CreateProductRequest): Promise<Product>
}
