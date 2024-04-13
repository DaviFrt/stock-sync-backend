import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { StocksRepository } from '../stocks-repository'

export class PrismaStocksRepository implements StocksRepository {
  async create(data: Prisma.StockCreateInput) {
    const stock = await prisma.stock.create({
      data,
    })

    return stock
  }
}
