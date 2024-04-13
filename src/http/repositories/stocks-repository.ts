import { Prisma, Stock } from '@prisma/client'

export interface StocksRepository {
  create(data: Prisma.StockCreateInput): Promise<Stock>
}
