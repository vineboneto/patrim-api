import { AuthMiddleware } from '@/presentation/middlewares'
import { LoadAccountByTokenSpy } from '@/tests/presentation/mocks'

import faker from 'faker'

const mockRequest = (): AuthMiddleware.Request => ({
  accessToken: faker.random.uuid()
})

type SutTypes = {
  sut: AuthMiddleware
  loadAccountByTokenSpy: LoadAccountByTokenSpy
}

const makeSut = (role = faker.random.word()): SutTypes => {
  const loadAccountByTokenSpy = new LoadAccountByTokenSpy()
  const sut = new AuthMiddleware(loadAccountByTokenSpy, role)
  return {
    sut,
    loadAccountByTokenSpy
  }
}

describe('AuthMiddleware', () => {
  test('Should call LoadAccountByToken with correct values', async () => {
    const role = faker.random.word()
    const { sut, loadAccountByTokenSpy } = makeSut(role)
    const request = mockRequest()
    await sut.handle(request)
    expect(loadAccountByTokenSpy.accessToken).toBe(request.accessToken)
    expect(loadAccountByTokenSpy.role).toBe(role)
  })
})
