import { DbAddPlace } from '@/data/usecases'
import {
  AddOPlaceRepositorySpy,
  CheckPlaceByNameRepositorySpy,
  mockAddPlaceRepositoryParams
} from '@/tests/data/mocks'

type SutTypes = {
  sut: DbAddPlace
  addPlaceRepositorySpy: AddOPlaceRepositorySpy
  checkPlaceByNameRepositorySpy: CheckPlaceByNameRepositorySpy
}

const makeSut = (): SutTypes => {
  const addPlaceRepositorySpy = new AddOPlaceRepositorySpy()
  const checkPlaceByNameRepositorySpy = new CheckPlaceByNameRepositorySpy()
  const sut = new DbAddPlace(addPlaceRepositorySpy, checkPlaceByNameRepositorySpy)
  return {
    sut,
    addPlaceRepositorySpy,
    checkPlaceByNameRepositorySpy
  }
}

describe('DbAddPlace', () => {
  test('Should call AddPlaceRepository with correct value', async () => {
    const { sut, addPlaceRepositorySpy } = makeSut()
    const params = mockAddPlaceRepositoryParams()
    await sut.add(params)
    expect(addPlaceRepositorySpy.params).toEqual(params)
  })

  test('Should return null if AddPlaceRepository returns null', async () => {
    const { sut, addPlaceRepositorySpy } = makeSut()
    addPlaceRepositorySpy.model = null
    const data = await sut.add(mockAddPlaceRepositoryParams())
    expect(data).toEqual(addPlaceRepositorySpy.model)
  })

  test('Should return place if AddPlaceRepository returns place', async () => {
    const { sut, addPlaceRepositorySpy } = makeSut()
    const data = await sut.add(mockAddPlaceRepositoryParams())
    expect(data).toEqual(addPlaceRepositorySpy.model)
  })

  test('Should throws if AddPlaceRepository throws', async () => {
    const { sut, addPlaceRepositorySpy } = makeSut()
    jest.spyOn(addPlaceRepositorySpy, 'add').mockRejectedValueOnce(new Error())
    const promise = sut.add(mockAddPlaceRepositoryParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call CheckPlaceByNameRepository with correct value', async () => {
    const { sut, checkPlaceByNameRepositorySpy } = makeSut()
    const params = mockAddPlaceRepositoryParams()
    await sut.add(params)
    expect(checkPlaceByNameRepositorySpy.name).toBe(params.name)
  })

  test('Should return null if CheckPlaceByNameRepository returns true', async () => {
    const { sut, checkPlaceByNameRepositorySpy } = makeSut()
    checkPlaceByNameRepositorySpy.result = true
    const data = await sut.add(mockAddPlaceRepositoryParams())
    expect(data).toBe(null)
  })

  test('Should throws if CheckPlaceByNameRepository throws', async () => {
    const { sut, checkPlaceByNameRepositorySpy } = makeSut()
    jest.spyOn(checkPlaceByNameRepositorySpy, 'checkByName').mockRejectedValueOnce(new Error())
    const promise = sut.add(mockAddPlaceRepositoryParams())
    await expect(promise).rejects.toThrow()
  })
})
