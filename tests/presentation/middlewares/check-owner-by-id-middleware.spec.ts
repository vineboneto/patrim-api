import { CheckOwnerByIdMiddleware } from '@/presentation/middlewares'
import { badRequest, noContent, notFound, serverError } from '@/presentation/helper'
import { InvalidParamError } from '@/presentation/errors'
import { CheckOwnerByIdSpy } from '@/tests/domain/mocks'
import { ValidationSpy } from '@/tests/presentation/mocks'

import faker from 'faker'

const mockRequest = (): CheckOwnerByIdMiddleware.Params => ({
  id: faker.datatype.number()
})

type SutTypes = {
  sut: CheckOwnerByIdMiddleware
  checkOwnerByIdSpy: CheckOwnerByIdSpy
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const checkOwnerByIdSpy = new CheckOwnerByIdSpy()
  const validationSpy = new ValidationSpy()
  const sut = new CheckOwnerByIdMiddleware(checkOwnerByIdSpy, validationSpy)
  return {
    sut,
    checkOwnerByIdSpy,
    validationSpy
  }
}

describe('CheckOwnerByIdMiddleware', () => {
  test('Should call Validation with correct value', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('Should return 400 if Validation fails', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.result = new InvalidParamError('id')
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('id')))
  })

  test('Should call CheckOwnerById with correct value', async () => {
    const { sut, checkOwnerByIdSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(checkOwnerByIdSpy.params).toEqual(request)
  })

  test('Should return 404 if CheckOwnerById return false', async () => {
    const { sut, checkOwnerByIdSpy } = makeSut()
    checkOwnerByIdSpy.result = false
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(notFound())
  })

  test('Should return 204 if CheckOwnerById return true', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('Should throws if CheckOwnerById throws', async () => {
    const { sut, checkOwnerByIdSpy } = makeSut()
    const error = new Error()
    jest.spyOn(checkOwnerByIdSpy, 'checkById').mockRejectedValueOnce(error)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(error))
  })
})
