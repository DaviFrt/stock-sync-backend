import { InMemoryUsersRepository } from '@/http/repositories/in-memory/in-memory-users-repository'
import { describe, expect, it } from 'vitest'
import { GetUserUseCase } from './get-user'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

describe('Get User Use Case', () => {
  it('Should be able to get user', async () => {
    const userRepository = new InMemoryUsersRepository()
    const getUserUseCase = new GetUserUseCase(userRepository)

    await userRepository.create({
      data: {
        id: '123',
        name: 'John Doe',
        email: 'johndoe@example.com',
        password_hash: '123456',
      },
    })

    const { user } = await getUserUseCase.execute({
      user_id: '123',
    })

    expect(user).toEqual(
      expect.objectContaining({
        name: 'John Doe',
      }),
    )
  })

  it('Should not be able to get user with invalid id', async () => {
    const userRepository = new InMemoryUsersRepository()
    const getUserUseCase = new GetUserUseCase(userRepository)

    await expect(
      getUserUseCase.execute({
        user_id: '123',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
