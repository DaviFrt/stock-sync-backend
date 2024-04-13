import { InMemoryProductsRepository } from '@/http/repositories/in-memory/in-memory-products-repository'
import { describe, expect, it } from 'vitest'
import { GetAllProductsUseCase } from './get-all'

describe('Get All Products Use Case', () => {
  it('Should be able to get all products', async () => {
    const productsRepository = new InMemoryProductsRepository()
    const getAllUseCase = new GetAllProductsUseCase(productsRepository)

    const data = {
      name: 'Miojin gostoso',
      description: 'Um miojo muito bom de frango',
      price: 5.99,
      quantity: 20,
      user_id: '123456',
    }

    productsRepository.create({ data, stock_id: '123456' })

    const secondProduct = {
      name: 'Arrozin',
      description: 'Um arrozin muito bom',
      price: 7,
      quantity: 35,
      user_id: '123456',
    }

    productsRepository.create({ data: secondProduct, stock_id: '123456' })

    const products = await getAllUseCase.execute({ stock_id: '123456' })

    expect(products).toHaveLength(2)
    expect(products).toEqual([
      expect.objectContaining({ name: 'Miojin gostoso' }),
      expect.objectContaining({ name: 'Arrozin' }),
    ])
  })
})
