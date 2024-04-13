import { Prisma, Product } from '@prisma/client'

export interface CreateProductRequest {
  data: Prisma.ProductCreateWithoutStockInput
  stock_id: string
}

export interface UpdateProductRequest {
  name?: string
  description?: string
  price?: number
  quantity?: number
  product_id: string
}

export interface ProductsRepository {
  create({ data, stock_id }: CreateProductRequest): Promise<Product>
  getAll(stock_id: string): Promise<Product[]>
  updateProduct(data: UpdateProductRequest): Promise<Product>
  findById(product_id: string): Promise<Product | null>
}
