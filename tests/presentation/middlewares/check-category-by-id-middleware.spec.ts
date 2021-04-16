import { CheckCategoryByIdMiddleware } from '@/presentation/middlewares'
import { CheckCategoryByIdSpy } from '@/tests/domain/mocks'
import { noContent, notFound, serverError } from '@/presentation/helper'

import faker from 'faker'

const mockRequest = (): CheckCategoryByIdMiddleware.Params => ({
  id: faker.datatype.number()
})

type SutTypes = {
  sut: CheckCategoryByIdMiddleware
  checkCategoryByIdSpy: CheckCategoryByIdSpy
}

const makeSut = (): SutTypes => {
  const checkCategoryByIdSpy = new CheckCategoryByIdSpy()
  const sut = new CheckCategoryByIdMiddleware(checkCategoryByIdSpy)
  return {
    sut,
    checkCategoryByIdSpy
  }
}

describe('CheckCategoryByIdMiddleware', () => {
  test('Should call CheckCategoryById with correct value', async () => {
    const { sut, checkCategoryByIdSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(checkCategoryByIdSpy.params).toEqual(request)
  })

  test('Should return 404 if CheckCategoryById return false', async () => {
    const { sut, checkCategoryByIdSpy } = makeSut()
    checkCategoryByIdSpy.result = false
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(notFound())
  })

  test('Should return 204 if CheckCategoryById return true', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('Should throws if CheckCategoryById throws', async () => {
    const { sut, checkCategoryByIdSpy } = makeSut()
    const error = new Error()
    jest.spyOn(checkCategoryByIdSpy, 'checkById').mockRejectedValueOnce(error)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(error))
  })
})
