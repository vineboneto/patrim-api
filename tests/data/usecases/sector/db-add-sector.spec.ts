import { DbAddSector } from '@/data/usecases/'
import { AddSectorRepositorySpy, CheckSectorByNameRepositorySpy } from '@/tests/data/mocks'
import { mockAddSectorParams } from '@/tests/domain/mocks/'

type SutTypes = {
  sut: DbAddSector
  addSectorRepositorySpy: AddSectorRepositorySpy
  checkSectorByNameRepositorySpy: CheckSectorByNameRepositorySpy
}

const makeSut = (): SutTypes => {
  const addSectorRepositorySpy = new AddSectorRepositorySpy()
  const checkSectorByNameRepositorySpy = new CheckSectorByNameRepositorySpy()
  const sut = new DbAddSector(addSectorRepositorySpy, checkSectorByNameRepositorySpy)
  return {
    sut,
    addSectorRepositorySpy,
    checkSectorByNameRepositorySpy
  }
}

describe('DbAddSector', () => {
  test('Should call AddSectorRepository with correct values', async () => {
    const { sut, addSectorRepositorySpy } = makeSut()
    const sector = mockAddSectorParams()
    await sut.add(sector)
    expect(addSectorRepositorySpy.params).toEqual(sector)
  })

  test('Should return false if AddSectorRepository return false', async () => {
    const { sut, addSectorRepositorySpy } = makeSut()
    addSectorRepositorySpy.result = false
    const isValid = await sut.add(mockAddSectorParams())
    expect(isValid).toBe(false)
  })

  test('Should throw if AddSectorRepository throws', async () => {
    const { sut, addSectorRepositorySpy } = makeSut()
    jest.spyOn(addSectorRepositorySpy, 'addSector').mockRejectedValueOnce(new Error())
    const promise = sut.add(mockAddSectorParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call CheckSectorByNameRepository with correct values', async () => {
    const { sut, checkSectorByNameRepositorySpy } = makeSut()
    const sector = mockAddSectorParams()
    await sut.add(sector)
    expect(checkSectorByNameRepositorySpy.name).toBe(sector.name)
  })

  test('Should returns false if CheckSectorByNameRepository returns true', async () => {
    const { sut, checkSectorByNameRepositorySpy } = makeSut()
    checkSectorByNameRepositorySpy.result = true
    const isValid = await sut.add(mockAddSectorParams())
    expect(isValid).toBe(false)
  })

  test('Should throw if CheckSectorByNameRepository throws', async () => {
    const { sut, checkSectorByNameRepositorySpy } = makeSut()
    jest.spyOn(checkSectorByNameRepositorySpy, 'checkByName').mockRejectedValueOnce(new Error())
    const promise = sut.add(mockAddSectorParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return true on success ', async () => {
    const { sut } = makeSut()
    const isValid = await sut.add(mockAddSectorParams())
    expect(isValid).toBe(true)
  })
})