import { SignUpController } from '@/presentation/controllers'
import { EmailInUseError, ServerError } from '@/presentation/errors'
import { ok, serverError, unprocessableEntity } from '@/presentation/helper'
import { AddAccountSpy, AuthenticationSpy } from '@/tests/domain/mocks'

import faker from 'faker'

const mockRequest = (): SignUpController.Request => {
  const password = faker.internet.password()
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password
  }
}

type SutTypes = {
  sut: SignUpController
  addAccountSpy: AddAccountSpy
  authenticationSpy: AuthenticationSpy
}

const makeSut = (): SutTypes => {
  const addAccountSpy = new AddAccountSpy()
  const authenticationSpy = new AuthenticationSpy()
  const sut = new SignUpController(addAccountSpy, authenticationSpy)
  return {
    sut,
    addAccountSpy,
    authenticationSpy
  }
}

describe('SignUpController', () => {
  test('Should call AddAccount with correct values', async () => {
    const { sut, addAccountSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(addAccountSpy.params).toEqual(request)
  })

  test('Should return 422 if AddAccount returns false', async () => {
    const { sut, addAccountSpy } = makeSut()
    addAccountSpy.result = false
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(unprocessableEntity(new EmailInUseError()))
  })

  test('Should returns 500 if AddAccount throws', async () => {
    const { sut, addAccountSpy } = makeSut()
    jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(authenticationSpy.params).toEqual({
      email: request.email,
      password: request.password
    })
  })

  test('Should return 200 if valid data are provided', async () => {
    const { sut, authenticationSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(authenticationSpy.result))
  })
})
