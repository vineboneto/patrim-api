import { CheckOwnerByIdMiddleware } from '@/presentation/middlewares'
import { CheckOwnerByIdSpy } from '@/tests/domain/mocks'
import { noContent, notFound, serverError } from '@/presentation/helper'

import faker from 'faker'

const mockRequest = (): CheckOwnerByIdMiddleware.Params => ({
  id: faker.datatype.number().toString()
})

type SutTypes = {
  sut: CheckOwnerByIdMiddleware
  checkOwnerByIdSpy: CheckOwnerByIdSpy
}

const makeSut = (): SutTypes => {
  const checkOwnerByIdSpy = new CheckOwnerByIdSpy()
  const sut = new CheckOwnerByIdMiddleware(checkOwnerByIdSpy)
  return {
    sut,
    checkOwnerByIdSpy
  }
}

describe('CheckOwnerByIdMiddleware', () => {
  test('Should call CheckOwnerById with correct value', async () => {
    const { sut, checkOwnerByIdSpy } = makeSut()
    const { id } = mockRequest()
    await sut.handle({ id })
    expect(checkOwnerByIdSpy.id).toBe(id)
  })

  test('Should return 404 if CheckOwnerById return false', async () => {
    const { sut, checkOwnerByIdSpy } = makeSut()
    checkOwnerByIdSpy.result = false
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(notFound())
  })

  test('Should return 204 if CheckOwnerById return true', async () => {
    const { sut } = makeSut()
    const { id } = mockRequest()
    const httpResponse = await sut.handle({ id })
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
