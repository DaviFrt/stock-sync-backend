import { InMemoryUsersRepository } from '@/http/repositories/in-memory/in-memory-users-repository'
import { describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

describe('Authenticate Use Case', () => {
  it('Should be able to authenticate', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const authenticateUsecase = new AuthenticateUseCase(usersRepository)

    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await authenticateUsecase.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('Should not be able to authenticate with wrong e-mail', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const authenticateUsecase = new AuthenticateUseCase(usersRepository)

    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    await expect(
      authenticateUsecase.execute({
        email: 'davi@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('Should not be able to authenticate with wrong password', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const authenticateUsecase = new AuthenticateUseCase(usersRepository)

    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    await expect(
      authenticateUsecase.execute({
        email: 'johndoe@example.com',
        password: 'davi123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
