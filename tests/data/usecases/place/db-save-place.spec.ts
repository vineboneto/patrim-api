import { DbSavePlace } from '@/data/usecases'
import {
  AddOPlaceRepositorySpy,
  mockAddPlaceRepositoryParams,
  mockUpdatePlaceRepositoryParams,
  UpdatePlaceRepositorySpy
} from '@/tests/data/mocks'

type SutTypes = {
  sut: DbSavePlace
  addPlaceRepositorySpy: AddOPlaceRepositorySpy
  updatePlaceRepositorySpy: UpdatePlaceRepositorySpy
}

const makeSut = (): SutTypes => {
  const addPlaceRepositorySpy = new AddOPlaceRepositorySpy()
  const updatePlaceRepositorySpy = new UpdatePlaceRepositorySpy()
  const sut = new DbSavePlace(addPlaceRepositorySpy, updatePlaceRepositorySpy)
  return {
    sut,
    addPlaceRepositorySpy,
    updatePlaceRepositorySpy
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

  test('Should throws if AddPlaceRepository throws', async () => {
    const { sut, addPlaceRepositorySpy } = makeSut()
    jest.spyOn(addPlaceRepositorySpy, 'add').mockRejectedValueOnce(new Error())
    const promise = sut.save(mockAddPlaceRepositoryParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call UpdatePlaceRepository with correct value', async () => {
    const { sut, updatePlaceRepositorySpy } = makeSut()
    const params = mockUpdatePlaceRepositoryParams()
    await sut.save(params)
    expect(updatePlaceRepositorySpy.params).toEqual(params)
  })

  test('Should return null UpdatePlaceRepository if returns null', async () => {
    const { sut, updatePlaceRepositorySpy } = makeSut()
    updatePlaceRepositorySpy.model = null
    const data = await sut.save(mockUpdatePlaceRepositoryParams())
    expect(data).toBe(null)
  })

  test('Should return place UpdatePlaceRepository if returns place', async () => {
    const { sut, updatePlaceRepositorySpy } = makeSut()
    const data = await sut.save(mockUpdatePlaceRepositoryParams())
    expect(data).toEqual(updatePlaceRepositorySpy.model)
  })
})
