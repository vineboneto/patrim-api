import { DbAuthentication } from '@/data/usecases'
import { LoadAccountByEmailRepository } from '@/data/protocols'

import faker from 'faker'

class LoadAccountByEmailRepositorySpy implements LoadAccountByEmailRepository {
  email: string
  account = {
    id: faker.random.number(10),
    name: faker.name.findName(),
    password: faker.internet.password()
  }

  async loadByEmail (email: string): Promise<LoadAccountByEmailRepository.Result> {
    this.email = email
    return this.account
  }
}

describe('DbAuthentication', () => {
  test('Should calls LoadAccountByEmailRepository with correct value', async () => {
    const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy()
    const sut = new DbAuthentication(loadAccountByEmailRepositorySpy)
    const authenticationParams = {
      email: faker.internet.email(),
      password: faker.internet.password()
    }
    await sut.auth(authenticationParams)
    expect(loadAccountByEmailRepositorySpy.email).toBe(authenticationParams.email)
  })
})
