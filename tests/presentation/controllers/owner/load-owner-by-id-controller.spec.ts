import { LoadOwnerByIdController } from '@/presentation/controllers'
import { noContent, ok, serverError } from '@/presentation/helper'
import { LoadOwnerByIdSpy } from '@/tests/domain/mocks'

import faker from 'faker'

const mockRequest = (): LoadOwnerByIdController.Request => ({
  id: faker.datatype.number(),
  accountId: faker.datatype.number()
})

type SutTypes = {
  sut: LoadOwnerByIdController
  loadOwnerByIdSpy: LoadOwnerByIdSpy
}

const makeSut = (): SutTypes => {
  const loadOwnerByIdSpy = new LoadOwnerByIdSpy()
  const sut = new LoadOwnerByIdController(loadOwnerByIdSpy)
  return {
    sut,
    loadOwnerByIdSpy
  }
}

describe('LoadOwnerByIdController', () => {
  test('Should call LoadOwnerById with correct values', async () => {
    const { sut, loadOwnerByIdSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadOwnerByIdSpy.params).toEqual(request)
  })

  test('Should return 200 on success', async () => {
    const { sut, loadOwnerByIdSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(loadOwnerByIdSpy.model))
  })

  test('Should return 204 on load not exists', async () => {
    const { sut, loadOwnerByIdSpy } = makeSut()
    loadOwnerByIdSpy.model = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 500 if LoadOwnerById throws', async () => {
    const { sut, loadOwnerByIdSpy } = makeSut()
    jest.spyOn(loadOwnerByIdSpy, 'loadById').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
