import { LoadPlacesController } from '@/presentation/controllers'
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
})
