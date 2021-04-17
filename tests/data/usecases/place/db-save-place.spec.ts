import { DbSavePlace } from '@/data/usecases'
import { AddOPlaceRepositorySpy, mockAddPlaceRepositoryParams } from '@/tests/data/mocks'

type SutTypes = {
  sut: DbSavePlace
  addPlaceRepositorySpy: AddOPlaceRepositorySpy
}

const makeSut = (): SutTypes => {
  const addPlaceRepositorySpy = new AddOPlaceRepositorySpy()
  const sut = new DbSavePlace(addPlaceRepositorySpy)
  return {
    sut,
    addPlaceRepositorySpy
  }
}

describe('DbSavePlace', () => {
  test('Should call AddPlaceRepository with correct value', async () => {
    const { sut, addPlaceRepositorySpy } = makeSut()
    const params = mockAddPlaceRepositoryParams()
    await sut.save(params)
    expect(addPlaceRepositorySpy.params).toEqual(params)
  })

  test('Should return null if AddPlaceRepository returns null', async () => {
    const { sut, addPlaceRepositorySpy } = makeSut()
    addPlaceRepositorySpy.model = null
    const data = await sut.save(mockAddPlaceRepositoryParams())
    expect(data).toEqual(addPlaceRepositorySpy.model)
  })

  test('Should return place if AddPlaceRepository returns place', async () => {
    const { sut, addPlaceRepositorySpy } = makeSut()
    const data = await sut.save(mockAddPlaceRepositoryParams())
    expect(data).toEqual(addPlaceRepositorySpy.model)
  })
})
