import { InMemoryStocksRepository } from '@/http/repositories/in-memory/in-memory-stocks-repository'
import { InMemoryUsersRepository } from '@/http/repositories/in-memory/in-memory-users-repository'
import { describe, expect, it } from 'vitest'
import { CreateStockUseCase } from './create'
import { UnauthorizedError } from '../errors/unauthorized-error'

describe('Create Stock Use Case', () => {
  it('Should be able to create a stock', async () => {
    const stocksRepository = new InMemoryStocksRepository()
    const usersRepository = new InMemoryUsersRepository()
    const createStockUseCase = new CreateStockUseCase(
      stocksRepository,
      usersRepository,
    )

    const data = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: '123456',
    }

    const user = await usersRepository.create({ data })

    const { stock } = await createStockUseCase.execute({
      name: 'Lojinha do John Doe',
      user_id: user.id,
    })

    expect(stock.id).toEqual(expect.any(String))
  })

  it('Should not be able to create two stocks with same user', async () => {
    const stocksRepository = new InMemoryStocksRepository()
    const usersRepository = new InMemoryUsersRepository()
    const createStockUseCase = new CreateStockUseCase(
      stocksRepository,
      usersRepository,
    )

    const data = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: '123456',
    }

    const user = await usersRepository.create({ data })

    await createStockUseCase.execute({
      name: 'Lojinha do John Doe',
      user_id: user.id,
    })

    await expect(
      createStockUseCase.execute({
        name: 'Lojinha do John Doe',
        user_id: user.id,
      }),
    ).rejects.toBeInstanceOf(UnauthorizedError)
  })
})
