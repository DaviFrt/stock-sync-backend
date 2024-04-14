import { InMemoryProductsRepository } from '@/http/repositories/in-memory/in-memory-products-repository'
import { describe, expect, it } from 'vitest'
import { DeleteProductByIdUseCase } from './delete-by-id'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

describe('Delete Product By Id Use Case', () => {
  it('Should be able to delete one product', async () => {
    const productsRepository = new InMemoryProductsRepository()
    const deleteProductById = new DeleteProductByIdUseCase(productsRepository)

    await productsRepository.create({
      data: {
        id: '123',
        name: 'Miojin gostoso',
        description: 'Um miojo muito bom de frango',
        price: 5.99,
        quantity: 20,
      },
      stock_id: '123456',
    })

    await productsRepository.create({
      data: {
        id: '456',
        name: 'Macarrão gostoso',
        description: 'Um miojo muito bom de frango',
        price: 3.99,
        quantity: 20,
      },
      stock_id: '123456',
    })

    const product = await deleteProductById.execute({
      product_id: '456',
    })

    expect(product).toEqual(
      expect.objectContaining({
        name: 'Macarrão gostoso',
      }),
    )
  })

  it('Should not be able to delete one product with invalid id', async () => {
    const productsRepository = new InMemoryProductsRepository()
    const deleteProductById = new DeleteProductByIdUseCase(productsRepository)

    await expect(
      deleteProductById.execute({
        product_id: '456',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
