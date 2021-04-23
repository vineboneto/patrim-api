import { LoadPatrimoniesController } from '@/presentation/controllers'
import { noContent, ok, serverError } from '@/presentation/helper'
import { LoadPatrimoniesSpy } from '@/tests/domain/mocks'

import faker from 'faker'

const mockRequest = (): LoadPatrimoniesController.Request => ({
  take: faker.datatype.number(),
  skip: faker.datatype.number()
})

type SutTypes = {
  sut: LoadPatrimoniesController
  loadPatrimoniesSpy: LoadPatrimoniesSpy
}

const makeSut = (): SutTypes => {
  const loadPatrimoniesSpy = new LoadPatrimoniesSpy()
  const sut = new LoadPatrimoniesController(loadPatrimoniesSpy)
  return {
    sut,
    loadPatrimoniesSpy
  }
}

describe('LoadPatrimoniesController', () => {
  test('Should call LoadPatrimonies with correct values', async () => {
    const { sut, loadPatrimoniesSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadPatrimoniesSpy.params).toEqual(request)
  })

  test('Should return 204 if LoadPatrimonies return empty array', async () => {
    const { sut, loadPatrimoniesSpy } = makeSut()
    loadPatrimoniesSpy.models = []
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 200 if LoadPatrimonies return patrimonies', async () => {
    const { sut, loadPatrimoniesSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(loadPatrimoniesSpy.models))
  })

  test('Should return 500 if LoadPatrimonies throws', async () => {
    const { sut, loadPatrimoniesSpy } = makeSut()
    jest.spyOn(loadPatrimoniesSpy, 'load').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
