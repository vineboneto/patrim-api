import { CheckSectorByIdMiddleware } from '@/presentation/middlewares'
import { CheckSectorByIdSpy } from '@/tests/domain/mocks'
import { InvalidParamError } from '@/presentation/errors'
import { noContent, notFound, serverError } from '@/presentation/helper'

import faker from 'faker'

const mockRequest = (): CheckSectorByIdMiddleware.Request => ({
  id: faker.datatype.number().toString()
})

type SutTypes = {
  sut: CheckSectorByIdMiddleware
  checkSectorByIdSpy: CheckSectorByIdSpy
}

const makeSut = (): SutTypes => {
  const checkSectorByIdSpy = new CheckSectorByIdSpy()
  const sut = new CheckSectorByIdMiddleware(checkSectorByIdSpy)
  return {
    sut,
    checkSectorByIdSpy
  }
}

describe('CheckSectorByIdMiddleware', () => {
  test('Should call CheckSectorById with correct value', async () => {
    const { sut, checkSectorByIdSpy } = makeSut()
    const { id } = mockRequest()
    await sut.handle({ id })
    expect(checkSectorByIdSpy.id).toBe(id)
  })

  test('Should return 404 if CheckSectorById return false', async () => {
    const { sut, checkSectorByIdSpy } = makeSut()
    checkSectorByIdSpy.result = false
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(notFound(new InvalidParamError('id')))
  })

  test('Should return 204 if CheckSectorById return true', async () => {
    const { sut } = makeSut()
    const { id } = mockRequest()
    const httpResponse = await sut.handle({ id })
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
