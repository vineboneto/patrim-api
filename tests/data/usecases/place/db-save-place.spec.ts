import { DbSavePlace } from '@/data/usecases'
import {
  AddPlaceRepositorySpy,
  CheckPlaceByNameRepositorySpy,
  mockAddPlaceParams,
  mockUpdatePlaceParams,
  UpdatePlaceRepositorySpy
} from '@/tests/data/mocks'

type SutTypes = {
  sut: DbSavePlace
  checkPlaceByNameRepositorySpy: CheckPlaceByNameRepositorySpy
  updatePlaceRepositorySpy: UpdatePlaceRepositorySpy
  addPlaceRepositorySpy: AddPlaceRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkPlaceByNameRepositorySpy = new CheckPlaceByNameRepositorySpy()
  const updatePlaceRepositorySpy = new UpdatePlaceRepositorySpy()
  const addPlaceRepositorySpy = new AddPlaceRepositorySpy()
  const sut = new DbSavePlace(checkPlaceByNameRepositorySpy, updatePlaceRepositorySpy, addPlaceRepositorySpy)
  return {
    sut,
    checkPlaceByNameRepositorySpy,
    updatePlaceRepositorySpy,
    addPlaceRepositorySpy
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

  test('Should return true UpdatePlaceRepository returns true', async () => {
    const { sut } = makeSut()
    const result = await sut.save(mockUpdatePlaceParams())
    expect(result).toBe(true)
  })

  test('Should call UpdatePlaceRepository if id is not undefined', async () => {
    const { sut, updatePlaceRepositorySpy, addPlaceRepositorySpy } = makeSut()
    await sut.save(mockUpdatePlaceParams())
    expect(updatePlaceRepositorySpy.callsCount).toBe(1)
    expect(addPlaceRepositorySpy.callsCount).toBe(0)
  })

  test('Should throw UpdatePlaceRepository throw', async () => {
    const { sut, updatePlaceRepositorySpy } = makeSut()
    jest.spyOn(updatePlaceRepositorySpy, 'update').mockRejectedValueOnce(new Error())
    const promise = sut.save(mockUpdatePlaceParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call AddPlaceRepository with correct value', async () => {
    const { sut, addPlaceRepositorySpy } = makeSut()
    const data = mockAddPlaceParams()
    await sut.save(data)
    expect(addPlaceRepositorySpy.params).toEqual(data)
  })

  test('Should call AddPlaceRepository if id is undefined', async () => {
    const { sut, addPlaceRepositorySpy, updatePlaceRepositorySpy } = makeSut()
    await sut.save(mockAddPlaceParams())
    expect(addPlaceRepositorySpy.callsCount).toBe(1)
    expect(updatePlaceRepositorySpy.callsCount).toBe(0)
  })
})
