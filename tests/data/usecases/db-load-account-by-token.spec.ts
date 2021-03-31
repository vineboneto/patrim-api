import { DbLoadAccountByToken } from '@/data/usecases'
import { LoadAccountByTokenRepositorySpy } from '@/tests/data/mocks'

import faker from 'faker'

type SutTypes = {
  sut: DbLoadAccountByToken
  loadAccountByTokenRepositorySpy: LoadAccountByTokenRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadAccountByTokenRepositorySpy = new LoadAccountByTokenRepositorySpy()
  const sut = new DbLoadAccountByToken(loadAccountByTokenRepositorySpy)
  return {
    sut,
    loadAccountByTokenRepositorySpy
  }
}

describe('DbLoadAccountByToken', () => {
  test('Should call LoadAccountByTokenRepository with correct values', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()
    const accessToken = faker.random.uuid()
    const role = faker.random.word()
    await sut.load(accessToken, role)
    expect(loadAccountByTokenRepositorySpy.token).toBe(accessToken)
    expect(loadAccountByTokenRepositorySpy.role).toBe(role)
  })
})
