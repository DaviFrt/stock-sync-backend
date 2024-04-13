import { InMemoryProductsRepository } from '@/http/repositories/in-memory/in-memory-products-repository'
import { describe, expect, it } from 'vitest'
import { CreateProductUseCase } from './create'
import { InMemoryUsersRepository } from '@/http/repositories/in-memory/in-memory-users-repository'
import { InMemoryStocksRepository } from '@/http/repositories/in-memory/in-memory-stocks-repository'
import { UnauthorizedError } from '../errors/unauthorized-error'

describe('Create Product Use Case', () => {
  it('Should be able to create a product', async () => {
    const productsRepository = new InMemoryProductsRepository()
    const usersRepository = new InMemoryUsersRepository()
    const stocksRepository = new InMemoryStocksRepository()
    const createProductUseCase = new CreateProductUseCase(
      productsRepository,
      usersRepository,
    )

    stocksRepository.items.push({
      id: '123456',
      name: 'Lojinha do John',
    })

    const data = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: '123456',
    }

    const user = await usersRepository.create({ data, stock_id: '123456' })

    const product = await createProductUseCase.execute({
      name: 'Miojin gostoso',
      description: 'Um miojo muito bom de frango',
      price: 5.99,
      quantity: 20,
      user_id: user.id,
    })

    expect(product.id).toEqual(expect.any(String))
  })

  it('Should be able to create a product without stock_id', async () => {
    const productsRepository = new InMemoryProductsRepository()
    const usersRepository = new InMemoryUsersRepository()
    const createProductUseCase = new CreateProductUseCase(
      productsRepository,
      usersRepository,
    )

    const data = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: '123456',
    }

    const user = await usersRepository.create({ data })

    await expect(
      createProductUseCase.execute({
        name: 'Miojin gostoso',
        description: 'Um miojo muito bom de frango',
        price: 5.99,
        quantity: 20,
        user_id: user.id,
      }),
    ).rejects.toBeInstanceOf(UnauthorizedError)
  })
})
