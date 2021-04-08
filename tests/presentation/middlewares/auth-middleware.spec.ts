import { AuthMiddleware } from '@/presentation/middlewares'
import { forbidden, ok, serverError } from '@/presentation/helper'
import { AccessDeniedError } from '@/presentation/errors'
import { LoadAccountByTokenSpy } from '@/tests/domain/mocks'

import faker from 'faker'

const mockRequest = (): AuthMiddleware.Request => ({
  accessToken: faker.datatype.uuid()
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

  test('Should return 403 if LoadAccountByToken returns null', async () => {
    const { sut, loadAccountByTokenSpy } = makeSut()
    loadAccountByTokenSpy.result = null
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should return 500 if LoadAccountByToken  throws', async () => {
    const { sut, loadAccountByTokenSpy } = makeSut()
    const error = new Error()
    jest.spyOn(loadAccountByTokenSpy, 'load').mockRejectedValueOnce(error)
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(serverError(error))
  })

  test('Should return account id on success', async () => {
    const { sut, loadAccountByTokenSpy } = makeSut()
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(ok(loadAccountByTokenSpy.result))
  })
})
