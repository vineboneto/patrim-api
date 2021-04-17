import { DbSavePlace } from '@/data/usecases'
import {
  AddOPlaceRepositorySpy,
  CheckPlaceByNameRepositorySpy,
  mockAddPlaceRepositoryParams,
  mockUpdatePlaceRepositoryParams,
  UpdatePlaceRepositorySpy
} from '@/tests/data/mocks'

type SutTypes = {
  sut: DbSavePlace
  addPlaceRepositorySpy: AddOPlaceRepositorySpy
  updatePlaceRepositorySpy: UpdatePlaceRepositorySpy
  checkPlaceByNameRepositorySpy: CheckPlaceByNameRepositorySpy
}

const makeSut = (): SutTypes => {
  const addPlaceRepositorySpy = new AddOPlaceRepositorySpy()
  const updatePlaceRepositorySpy = new UpdatePlaceRepositorySpy()
  const checkPlaceByNameRepositorySpy = new CheckPlaceByNameRepositorySpy()
  const sut = new DbSavePlace(addPlaceRepositorySpy, updatePlaceRepositorySpy, checkPlaceByNameRepositorySpy)
  return {
    sut,
    addPlaceRepositorySpy,
    updatePlaceRepositorySpy,
    checkPlaceByNameRepositorySpy
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

  test('Should throws if UpdatePlaceRepository throws', async () => {
    const { sut, updatePlaceRepositorySpy } = makeSut()
    jest.spyOn(updatePlaceRepositorySpy, 'update').mockRejectedValueOnce(new Error())
    const promise = sut.save(mockUpdatePlaceRepositoryParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call CheckPlaceByNameRepository with correct value', async () => {
    const { sut, checkPlaceByNameRepositorySpy } = makeSut()
    const params = mockAddPlaceRepositoryParams()
    await sut.save(params)
    expect(checkPlaceByNameRepositorySpy.name).toBe(params.name)
  })

  test('Should return null if CheckPlaceByNameRepository returns true', async () => {
    const { sut, checkPlaceByNameRepositorySpy } = makeSut()
    checkPlaceByNameRepositorySpy.result = true
    const data = await sut.save(mockAddPlaceRepositoryParams())
    expect(data).toBe(null)
  })

  test('Should throws if CheckPlaceByNameRepository throws', async () => {
    const { sut, checkPlaceByNameRepositorySpy } = makeSut()
    jest.spyOn(checkPlaceByNameRepositorySpy, 'checkByName').mockRejectedValueOnce(new Error())
    const promise = sut.save(mockAddPlaceRepositoryParams())
    await expect(promise).rejects.toThrow()
  })
})
