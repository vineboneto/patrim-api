import { DbUpdatePlace } from '@/data/usecases'
import {
  CheckPlaceByNameRepositorySpy,
  LoadPlaceNameByIdRepositorySpy,
  mockUpdatePlaceRepositoryParams,
  UpdatePlaceRepositorySpy
} from '@/tests/data/mocks'

type SutTypes = {
  sut: DbUpdatePlace
  updatePlaceRepositorySpy: UpdatePlaceRepositorySpy
  loadPlaceNameByIdRepositorySpy: LoadPlaceNameByIdRepositorySpy
  checkPlaceByNameRepositorySpy: CheckPlaceByNameRepositorySpy
}

const makeSut = (): SutTypes => {
  const updatePlaceRepositorySpy = new UpdatePlaceRepositorySpy()
  const loadPlaceNameByIdRepositorySpy = new LoadPlaceNameByIdRepositorySpy()
  const checkPlaceByNameRepositorySpy = new CheckPlaceByNameRepositorySpy()
  const sut = new DbUpdatePlace(
    updatePlaceRepositorySpy,
    loadPlaceNameByIdRepositorySpy,
    checkPlaceByNameRepositorySpy
  )
  return {
    sut,
    updatePlaceRepositorySpy,
    loadPlaceNameByIdRepositorySpy,
    checkPlaceByNameRepositorySpy
  }
}

describe('DbUpdatePlace', () => {
  test('Should call UpdatePlaceRepository with correct value', async () => {
    const { sut, updatePlaceRepositorySpy } = makeSut()
    const params = mockUpdatePlaceRepositoryParams()
    await sut.update(params)
    expect(updatePlaceRepositorySpy.params).toEqual(params)
  })

  test('Should return null if UpdatePlaceRepository returns null', async () => {
    const { sut, updatePlaceRepositorySpy } = makeSut()
    updatePlaceRepositorySpy.model = null
    const data = await sut.update(mockUpdatePlaceRepositoryParams())
    expect(data).toBe(null)
  })

  test('Should return place on success', async () => {
    const { sut, updatePlaceRepositorySpy } = makeSut()
    const data = await sut.update(mockUpdatePlaceRepositoryParams())
    expect(data).toEqual(updatePlaceRepositorySpy.model)
  })

  test('Should throw if UpdatePlaceRepository throws', async () => {
    const { sut, updatePlaceRepositorySpy } = makeSut()
    jest.spyOn(updatePlaceRepositorySpy, 'update').mockRejectedValueOnce(new Error())
    const promise = sut.update(mockUpdatePlaceRepositoryParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call LoadPlaceNameByIdRepository with correct values', async () => {
    const { sut, loadPlaceNameByIdRepositorySpy } = makeSut()
    const params = mockUpdatePlaceRepositoryParams()
    await sut.update(params)
    expect(loadPlaceNameByIdRepositorySpy.id).toEqual(params.id)
  })

  test('Should return null if LoadPlaceNameByIdRepository returns different name', async () => {
    const { sut, loadPlaceNameByIdRepositorySpy, checkPlaceByNameRepositorySpy } = makeSut()
    checkPlaceByNameRepositorySpy.result = true
    loadPlaceNameByIdRepositorySpy.model.name = 'differentName'
    const data = await sut.update(mockUpdatePlaceRepositoryParams())
    expect(data).toBe(null)
  })

  test('Should throws if LoadPlaceNameByIdRepository throw', async () => {
    const { sut, loadPlaceNameByIdRepositorySpy } = makeSut()
    jest.spyOn(loadPlaceNameByIdRepositorySpy, 'loadNameById').mockRejectedValueOnce(new Error())
    const promise = sut.update(mockUpdatePlaceRepositoryParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call CheckPlaceByNameRepository with correct value', async () => {
    const { sut, checkPlaceByNameRepositorySpy } = makeSut()
    const params = mockUpdatePlaceRepositoryParams()
    await sut.update(params)
    expect(checkPlaceByNameRepositorySpy.name).toEqual(params.name)
  })

  test('Should return null if CheckPlaceByNameRepository return true', async () => {
    const { sut, checkPlaceByNameRepositorySpy, loadPlaceNameByIdRepositorySpy } = makeSut()
    loadPlaceNameByIdRepositorySpy.model.name = 'differentName'
    checkPlaceByNameRepositorySpy.result = true
    const params = mockUpdatePlaceRepositoryParams()
    const data = await sut.update(params)
    expect(data).toBe(null)
  })

  test('Should throws if CheckPlaceByNameRepository throw', async () => {
    const { sut, loadPlaceNameByIdRepositorySpy, checkPlaceByNameRepositorySpy } = makeSut()
    loadPlaceNameByIdRepositorySpy.model.name = 'differentName'
    jest.spyOn(checkPlaceByNameRepositorySpy, 'checkByName').mockRejectedValueOnce(new Error())
    const promise = sut.update(mockUpdatePlaceRepositoryParams())
    await expect(promise).rejects.toThrow()
  })
})
