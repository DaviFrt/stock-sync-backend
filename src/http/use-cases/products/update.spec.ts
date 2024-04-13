import { InMemoryProductsRepository } from '@/http/repositories/in-memory/in-memory-products-repository'
import { describe, expect, it } from 'vitest'
import { UpdateProductUseCase } from './update'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

describe('Update Product Use Case', () => {
  it('Should be able to update only product name', async () => {
    const productsRepository = new InMemoryProductsRepository()
    const updateProductUseCase = new UpdateProductUseCase(productsRepository)

    const data = {
      id: '12345',
      name: 'Miojin gostoso',
      description: 'Um miojo muito bom de frango',
      price: 5.99,
      quantity: 20,
      user_id: '123456',
    }

    productsRepository.create({ data, stock_id: '123456' })

    const dataToUpdate = {
      name: 'Arrozin',
      product_id: '12345',
    }

    const product = await updateProductUseCase.execute(dataToUpdate)

    expect(product).toEqual(
      expect.objectContaining({
        name: 'Arrozin',
        description: 'Um miojo muito bom de frango',
        price: 5.99,
        quantity: 20,
      }),
    )
  })

  it('Should be able to update various fields of product name', async () => {
    const productsRepository = new InMemoryProductsRepository()
    const updateProductUseCase = new UpdateProductUseCase(productsRepository)

    const data = {
      id: '12345',
      name: 'Miojin gostoso',
      description: 'Um miojo muito bom de frango',
      price: 5.99,
      quantity: 20,
      user_id: '123456',
    }

    productsRepository.create({ data, stock_id: '123456' })

    const dataToUpdate = {
      name: 'Arrozin',
      description: 'Um arrrozin muito bom de frango',
      price: 7.99,
      quantity: 450,
      product_id: '12345',
    }

    const product = await updateProductUseCase.execute(dataToUpdate)

    expect(product).toEqual(
      expect.objectContaining({
        name: 'Arrozin',
        description: 'Um arrrozin muito bom de frango',
        price: 7.99,
        quantity: 450,
      }),
    )
  })

  it('Should not be able to update product with invalid id', async () => {
    const productsRepository = new InMemoryProductsRepository()
    const updateProductUseCase = new UpdateProductUseCase(productsRepository)

    const dataToUpdate = {
      name: 'Arrozin',
      description: 'Um arrrozin muito bom de frango',
      price: 7.99,
      quantity: 450,
      product_id: '12345',
    }

    await expect(
      updateProductUseCase.execute(dataToUpdate),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
