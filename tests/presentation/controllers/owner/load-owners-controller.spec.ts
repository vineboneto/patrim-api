import { LoadOwnersController } from '@/presentation/controllers'
import { noContent, ok, serverError } from '@/presentation/helper'
import { LoadOwnersSpy } from '@/tests/domain/mocks'

import faker from 'faker'

const mockRequest = (): LoadOwnersController.Request => ({
  take: faker.datatype.number(),
  skip: faker.datatype.number(),
  accountId: faker.datatype.number()
})

type SutTypes = {
  sut: LoadOwnersController
  loadOwnersSpy: LoadOwnersSpy
}

const makeSut = (): SutTypes => {
  const loadOwnersSpy = new LoadOwnersSpy()
  const sut = new LoadOwnersController(loadOwnersSpy)
  return {
    sut,
    loadOwnersSpy
  }
}

describe('LoadOwnersController', () => {
  test('Should call LoadOwners with correct values', async () => {
    const { sut, loadOwnersSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadOwnersSpy.params).toEqual(request)
  })

  test('Should return 204 if LoadOwners return empty array', async () => {
    const { sut, loadOwnersSpy } = makeSut()
    loadOwnersSpy.result.model = []
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 200 if LoadOwners return owners', async () => {
    const { sut, loadOwnersSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(loadOwnersSpy.result))
  })

  test('Should return 500 if LoadOwners throws', async () => {
    const { sut, loadOwnersSpy } = makeSut()
    jest.spyOn(loadOwnersSpy, 'load').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
