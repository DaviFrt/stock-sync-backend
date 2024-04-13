import { randomUUID } from 'crypto'
import { StocksRepository } from '../stocks-repository'
import { Prisma, Stock } from '@prisma/client'

export class InMemoryStocksRepository implements StocksRepository {
  public items: Stock[] = []

  async create(data: Prisma.StockCreateInput) {
    const stock = {
      id: data.id || randomUUID(),
      name: data.name,
    }

    this.items.push(stock)

    return stock
  }
}
