import { LoadPatrimonyByIdController } from '@/presentation/controllers'
import { noContent, ok, serverError } from '@/presentation/helper'
import { LoadPatrimonyByIdSpy } from '@/tests/domain/mocks'

import faker from 'faker'

const mockRequest = (): LoadPatrimonyByIdController.Request => ({
  id: faker.datatype.number(),
  accountId: faker.datatype.number()
})

type SutTypes = {
  sut: LoadPatrimonyByIdController
  loadPatrimonyByIdSpy: LoadPatrimonyByIdSpy
}

const makeSut = (): SutTypes => {
  const loadPatrimonyByIdSpy = new LoadPatrimonyByIdSpy()
  const sut = new LoadPatrimonyByIdController(loadPatrimonyByIdSpy)
  return {
    sut,
    loadPatrimonyByIdSpy
  }
}

describe('LoadPatrimonyByIdController', () => {
  test('Should call LoadPatrimonyById with correct values', async () => {
    const { sut, loadPatrimonyByIdSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadPatrimonyByIdSpy.params).toEqual(request)
  })

  test('Should return 200 on success', async () => {
    const { sut, loadPatrimonyByIdSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(loadPatrimonyByIdSpy.model))
  })

  test('Should return 204 on load not exists', async () => {
    const { sut, loadPatrimonyByIdSpy } = makeSut()
    loadPatrimonyByIdSpy.model = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 500 if LoadPatrimonyById throws', async () => {
    const { sut, loadPatrimonyByIdSpy } = makeSut()
    jest.spyOn(loadPatrimonyByIdSpy, 'loadById').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
