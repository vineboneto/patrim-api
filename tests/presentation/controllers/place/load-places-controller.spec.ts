import { LoadPlacesController } from '@/presentation/controllers'
import { noContent, ok, serverError } from '@/presentation/helper'
import { LoadPlacesSpy } from '@/tests/domain/mocks'

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
  test('Should call LoadPlaces', async () => {
    const { sut, loadPlacesSpy } = makeSut()
    await sut.handle()
    expect(loadPlacesSpy.callsCount).toBe(1)
  })

  test('Should return 204 if places is empty', async () => {
    const { sut, loadPlacesSpy } = makeSut()
    loadPlacesSpy.placesModel = []
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 200 if places is not empty', async () => {
    const { sut, loadPlacesSpy } = makeSut()
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(ok(loadPlacesSpy.placesModel))
  })

  test('Should return 500 if places LoadPlaces throws', async () => {
    const { sut, loadPlacesSpy } = makeSut()
    const error = new Error()
    jest.spyOn(loadPlacesSpy, 'load').mockRejectedValueOnce(error)
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(serverError(error))
  })
})
