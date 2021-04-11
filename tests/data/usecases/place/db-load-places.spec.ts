import { DbLoadPlaces } from '@/data/usecases'
import { LoadPlacesRepositorySpy } from '@/tests/data/mocks'

type SutTypes = {
  sut: DbLoadPlaces
  loadPlacesRepositorySpy: LoadPlacesRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadPlacesRepositorySpy = new LoadPlacesRepositorySpy()
  const sut = new DbLoadPlaces(loadPlacesRepositorySpy)
  return {
    sut,
    loadPlacesRepositorySpy
  }
}

describe('DbLoadPlaces', () => {
  test('Should call LoadPlacesRepository', async () => {
    const { sut, loadPlacesRepositorySpy } = makeSut()
    await sut.load()
    expect(loadPlacesRepositorySpy.callCount).toBe(1)
  })

  test('Should returns places on LoadPlacesRepository success', async () => {
    const { sut, loadPlacesRepositorySpy } = makeSut()
    const httpResponse = await sut.load()
    expect(httpResponse).toBe(loadPlacesRepositorySpy.sectorModels)
  })

  test('Should throws if LoadPlacesRepository throws', async () => {
    const { sut, loadPlacesRepositorySpy } = makeSut()
    jest.spyOn(loadPlacesRepositorySpy, 'loadAll').mockRejectedValueOnce(new Error())
    const promise = sut.load()
    await expect(promise).rejects.toThrow()
  })
})
