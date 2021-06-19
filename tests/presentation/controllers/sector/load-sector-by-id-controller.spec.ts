import { LoadSectorByIdController } from '@/presentation/controllers'
import { noContent, ok, serverError } from '@/presentation/helper'
import { LoadSectorByIdSpy } from '@/tests/domain/mocks'

import faker from 'faker'

const mockRequest = (): LoadSectorByIdController.Request => ({
  id: faker.datatype.number(),
  accountId: faker.datatype.number()
})

type SutTypes = {
  sut: LoadSectorByIdController
  loadSectorByIdSpy: LoadSectorByIdSpy
}

const makeSut = (): SutTypes => {
  const loadSectorByIdSpy = new LoadSectorByIdSpy()
  const sut = new LoadSectorByIdController(loadSectorByIdSpy)
  return {
    sut,
    loadSectorByIdSpy
  }
}

describe('LoadSectorByIdController', () => {
  test('Should call LoadSectorById with correct values', async () => {
    const { sut, loadSectorByIdSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadSectorByIdSpy.params).toEqual(request)
  })

  test('Should return 200 on success', async () => {
    const { sut, loadSectorByIdSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(loadSectorByIdSpy.model))
  })

  test('Should return 204 on load not exists', async () => {
    const { sut, loadSectorByIdSpy } = makeSut()
    loadSectorByIdSpy.model = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 500 if LoadSectorById throws', async () => {
    const { sut, loadSectorByIdSpy } = makeSut()
    jest.spyOn(loadSectorByIdSpy, 'loadById').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
