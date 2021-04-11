import { DbSavePlace } from '@/data/usecases'
import {
  CheckPlaceByNameRepositorySpy,
  mockAddPlaceParams,
  mockUpdatePlaceParams,
  UpdatePlaceRepositorySpy
} from '@/tests/data/mocks'

type SutTypes = {
  sut: DbSavePlace
  checkPlaceByNameRepositorySpy: CheckPlaceByNameRepositorySpy
  updatePlaceRepositorySpy: UpdatePlaceRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkPlaceByNameRepositorySpy = new CheckPlaceByNameRepositorySpy()
  const updatePlaceRepositorySpy = new UpdatePlaceRepositorySpy()
  const sut = new DbSavePlace(checkPlaceByNameRepositorySpy, updatePlaceRepositorySpy)
  return {
    sut,
    checkPlaceByNameRepositorySpy,
    updatePlaceRepositorySpy
  }
}

describe('DbSavePlace', () => {
  test('Should call CheckPlaceByNameRepository with correct value', async () => {
    const { sut, checkPlaceByNameRepositorySpy } = makeSut()
    const data = mockAddPlaceParams()
    await sut.save(data)
    expect(checkPlaceByNameRepositorySpy.name).toBe(data.name)
  })

  test('Should return false CheckPlaceByNameRepository returns true', async () => {
    const { sut, checkPlaceByNameRepositorySpy } = makeSut()
    checkPlaceByNameRepositorySpy.result = true
    const result = await sut.save(mockAddPlaceParams())
    expect(result).toBe(false)
  })

  test('Should throw CheckPlaceByNameRepository throw', async () => {
    const { sut, checkPlaceByNameRepositorySpy } = makeSut()
    jest.spyOn(checkPlaceByNameRepositorySpy, 'checkByName').mockRejectedValueOnce(new Error())
    const promise = sut.save(mockAddPlaceParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call UpdatePlaceRepository with correct value', async () => {
    const { sut, updatePlaceRepositorySpy } = makeSut()
    const data = mockUpdatePlaceParams()
    await sut.save(data)
    expect(updatePlaceRepositorySpy.params).toEqual(data)
  })

  test('Should return false UpdatePlaceRepository returns false', async () => {
    const { sut, updatePlaceRepositorySpy } = makeSut()
    updatePlaceRepositorySpy.result = false
    const result = await sut.save(mockUpdatePlaceParams())
    expect(result).toBe(false)
  })
})
