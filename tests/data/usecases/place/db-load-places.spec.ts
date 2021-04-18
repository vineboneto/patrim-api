import { DbLoadPlaces } from '@/data/usecases'
import { LoadPlacesRepositorySpy, mockLoadPlacesRepositoryParams } from '@/tests/data/mocks'

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
  test('Should call LoadPlacesRepository with correct value', async () => {
    const { sut, loadPlacesRepositorySpy } = makeSut()
    const params = mockLoadPlacesRepositoryParams()
    await sut.load(params)
    expect(loadPlacesRepositorySpy.params).toEqual(params)
  })
})
