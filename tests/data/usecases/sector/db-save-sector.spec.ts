import { DbSaveSector } from '@/data/usecases'
import {
  CheckSectorByNameRepositorySpy,
  UpdateSectorRepositorySpy,
  mockUpdateSectorParams,
  mockAddSectorParams,
  AddSectorRepositorySpy
} from '@/tests/data/mocks'

type SutTypes = {
  sut: DbSaveSector
  updateSectorRepositorySpy: UpdateSectorRepositorySpy
  addSectorRepositorySpy: AddSectorRepositorySpy
  checkSectorByNameRepositorySpy: CheckSectorByNameRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkSectorByNameRepositorySpy = new CheckSectorByNameRepositorySpy()
  const updateSectorRepositorySpy = new UpdateSectorRepositorySpy()
  const addSectorRepositorySpy = new AddSectorRepositorySpy()
  const sut = new DbSaveSector(updateSectorRepositorySpy, addSectorRepositorySpy, checkSectorByNameRepositorySpy)
  return {
    sut,
    updateSectorRepositorySpy,
    addSectorRepositorySpy,
    checkSectorByNameRepositorySpy
  }
}

describe('DbSaveSector', () => {
  test('Should call UpdateSectorRepository with correct value', async () => {
    const { sut, updateSectorRepositorySpy } = makeSut()
    const sector = mockUpdateSectorParams()
    await sut.save(sector)
    expect(updateSectorRepositorySpy.params).toEqual(sector)
  })

  test('Should return false if UpdateSectorRepository returns false', async () => {
    const { sut, updateSectorRepositorySpy } = makeSut()
    updateSectorRepositorySpy.result = false
    const result = await sut.save(mockUpdateSectorParams())
    expect(result).toBe(false)
  })

  test('Should return true if UpdateSectorRepository return true', async () => {
    const { sut } = makeSut()
    const isValid = await sut.save(mockUpdateSectorParams())
    expect(isValid).toBe(true)
  })

  test('Should call UpdateSectorRepository if id is not undefined', async () => {
    const { sut, updateSectorRepositorySpy, addSectorRepositorySpy } = makeSut()
    await sut.save(mockUpdateSectorParams())
    expect(updateSectorRepositorySpy.callsCount).toBe(1)
    expect(addSectorRepositorySpy.callsCount).toBe(0)
  })

  test('Should throw if UpdateSectorRepository throws', async () => {
    const { sut, updateSectorRepositorySpy } = makeSut()
    jest.spyOn(updateSectorRepositorySpy, 'update').mockRejectedValueOnce(new Error())
    const promise = sut.save(mockUpdateSectorParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call AddSectorRepository with correct values', async () => {
    const { sut, addSectorRepositorySpy } = makeSut()
    const sector = mockAddSectorParams()
    await sut.save(sector)
    expect(addSectorRepositorySpy.params).toEqual(sector)
  })

  test('Should call CheckSectorByNameRepository with correct value', async () => {
    const { sut, checkSectorByNameRepositorySpy } = makeSut()
    const Sector = mockUpdateSectorParams()
    await sut.save(Sector)
    expect(checkSectorByNameRepositorySpy.name).toEqual(Sector.name)
  })

  test('Should return false if CheckSectorByNameRepository return true', async () => {
    const { sut, checkSectorByNameRepositorySpy } = makeSut()
    checkSectorByNameRepositorySpy.result = true
    const isValid = await sut.save(mockUpdateSectorParams())
    expect(isValid).toBeFalsy()
  })
})
