import { LoadPlacesController } from '@/presentation/controllers'
import { noContent, ok, serverError } from '@/presentation/helper'
import { LoadPlacesSpy } from '@/tests/domain/mocks'

import faker from 'faker'

const mockRequest = (): LoadPlacesController.Request => ({
  take: faker.datatype.number(),
  skip: faker.datatype.number()
})

type SutTypes = {
  sut: LoadPlacesController
  loadPlacesSpy: LoadPlacesSpy
}

const makeSut = (): SutTypes => {
  const loadPlacesSpy = new LoadPlacesSpy()
  const sut = new LoadPlacesController(loadPlacesSpy)
  return {
    sut,
    loadPlacesSpy
  }
}

describe('LoadPlacesController', () => {
  test('Should call LoadPlaces with correct values', async () => {
    const { sut, loadPlacesSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadPlacesSpy.params).toEqual(request)
  })

  test('Should return 204 if LoadPlaces returns empty array', async () => {
    const { sut, loadPlacesSpy } = makeSut()
    loadPlacesSpy.models = []
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 200 if LoadPlaces return places', async () => {
    const { sut, loadPlacesSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(loadPlacesSpy.models))
  })

  test('Should return 500 if LoadPlaces throws', async () => {
    const { sut, loadPlacesSpy } = makeSut()
    jest.spyOn(loadPlacesSpy, 'load').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
