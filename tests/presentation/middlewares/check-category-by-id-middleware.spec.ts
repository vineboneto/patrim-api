import { CheckCategoryByIdMiddleware } from '@/presentation/middlewares'
import { CheckCategoryByIdSpy } from '@/tests/domain/mocks'
import { InvalidParamError } from '@/presentation/errors'
import { notFound, ok, serverError } from '@/presentation/helper'

import faker from 'faker'

const mockRequest = (): CheckCategoryByIdMiddleware.Request => ({
  id: faker.datatype.number().toString()
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
    const { id } = mockRequest()
    await sut.handle({ id })
    expect(checkCategoryByIdSpy.id).toBe(id)
  })

  test('Should return 404 if CheckCategoryById return false', async () => {
    const { sut, checkCategoryByIdSpy } = makeSut()
    checkCategoryByIdSpy.result = false
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(notFound(new InvalidParamError('id')))
  })

  test('Should return 200 if CheckCategoryById return true', async () => {
    const { sut } = makeSut()
    const { id } = mockRequest()
    const httpResponse = await sut.handle({ id })
    expect(httpResponse).toEqual(ok({ id }))
  })

  test('Should throws if CheckCategoryById throws', async () => {
    const { sut, checkCategoryByIdSpy } = makeSut()
    const error = new Error()
    jest.spyOn(checkCategoryByIdSpy, 'checkById').mockRejectedValueOnce(error)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(error))
  })
})
