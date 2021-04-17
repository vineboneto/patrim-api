import { CheckPlaceByIdMiddleware } from '@/presentation/middlewares'
import { InvalidParamError } from '@/presentation/errors'
import { badRequest, noContent, notFound, serverError } from '@/presentation/helper'
import { CheckPlaceByIdSpy } from '@/tests/domain/mocks'
import { ValidationSpy } from '@/tests/presentation/mocks'

import faker from 'faker'

const mockRequest = (): CheckPlaceByIdMiddleware.Params => ({
  id: faker.datatype.number()
})

type SutTypes = {
  sut: CheckPlaceByIdMiddleware
  checkPlaceByIdSpy: CheckPlaceByIdSpy
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const checkPlaceByIdSpy = new CheckPlaceByIdSpy()
  const validationSpy = new ValidationSpy()
  const sut = new CheckPlaceByIdMiddleware(checkPlaceByIdSpy, validationSpy)
  return {
    sut,
    checkPlaceByIdSpy,
    validationSpy
  }
}

describe('CheckPlaceByIdMiddleware', () => {
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

  test('Should call CheckPlaceById with correct value', async () => {
    const { sut, checkPlaceByIdSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(checkPlaceByIdSpy.params).toEqual(request)
  })

  test('Should return 404 if CheckPlaceById return false', async () => {
    const { sut, checkPlaceByIdSpy } = makeSut()
    checkPlaceByIdSpy.result = false
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(notFound())
  })

  test('Should return 204 if CheckPlaceById return true', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('Should throws if CheckPlaceById throws', async () => {
    const { sut, checkPlaceByIdSpy } = makeSut()
    const error = new Error()
    jest.spyOn(checkPlaceByIdSpy, 'checkById').mockRejectedValueOnce(error)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(error))
  })
})
