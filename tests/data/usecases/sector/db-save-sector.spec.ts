import { DbSaveSector } from '@/data/usecases'
import {
  CheckSectorByNameRepositorySpy,
  UpdateSectorRepositorySpy,
  mockUpdateSectorParams
} from '@/tests/data/mocks'

type SutTypes = {
  sut: DbSaveSector
  updateSectorRepositorySpy: UpdateSectorRepositorySpy
  checkSectorByNameRepositorySpy: CheckSectorByNameRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkSectorByNameRepositorySpy = new CheckSectorByNameRepositorySpy()
  const updateSectorRepositorySpy = new UpdateSectorRepositorySpy()
  const sut = new DbSaveSector(updateSectorRepositorySpy, checkSectorByNameRepositorySpy)
  return {
    sut,
    updateSectorRepositorySpy,
    checkSectorByNameRepositorySpy
  }
}

describe('DbUpdateSector', () => {
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

  test('Should throw if UpdateSectorRepository throws', async () => {
    const { sut, updateSectorRepositorySpy } = makeSut()
    jest.spyOn(updateSectorRepositorySpy, 'update').mockRejectedValueOnce(new Error())
    const promise = sut.save(mockUpdateSectorParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return true if UpdateSectorRepository return true', async () => {
    const { sut } = makeSut()
    const isValid = await sut.save(mockUpdateSectorParams())
    expect(isValid).toBe(true)
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
