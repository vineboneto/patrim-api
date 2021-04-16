import { CheckSectorByIdMiddleware } from '@/presentation/middlewares'
import { badRequest, noContent, notFound, serverError } from '@/presentation/helper'
import { InvalidParamError } from '@/presentation/errors'
import { CheckSectorByIdSpy } from '@/tests/domain/mocks'
import { ValidationSpy } from '@/tests/presentation/mocks'

import faker from 'faker'

const mockRequest = (): CheckSectorByIdMiddleware.Params => ({
  id: faker.datatype.number()
})

type SutTypes = {
  sut: CheckSectorByIdMiddleware
  checkSectorByIdSpy: CheckSectorByIdSpy
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const checkSectorByIdSpy = new CheckSectorByIdSpy()
  const validationSpy = new ValidationSpy()
  const sut = new CheckSectorByIdMiddleware(checkSectorByIdSpy, validationSpy)
  return {
    sut,
    checkSectorByIdSpy,
    validationSpy
  }
}

describe('CheckSectorByIdMiddleware', () => {
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

  test('Should call CheckSectorById with correct value', async () => {
    const { sut, checkSectorByIdSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(checkSectorByIdSpy.params).toEqual(request)
  })

  test('Should return 404 if CheckSectorById return false', async () => {
    const { sut, checkSectorByIdSpy } = makeSut()
    checkSectorByIdSpy.result = false
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(notFound())
  })

  test('Should return 204 if CheckSectorById return true', async () => {
    const { sut } = makeSut()
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(noContent())
  })

  test('Should throws if CheckSectorById throws', async () => {
    const { sut, checkSectorByIdSpy } = makeSut()
    const error = new Error()
    jest.spyOn(checkSectorByIdSpy, 'checkById').mockRejectedValueOnce(error)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(error))
  })
})
