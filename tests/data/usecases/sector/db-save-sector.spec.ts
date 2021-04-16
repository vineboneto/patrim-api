import { DbSaveSector } from '@/data/usecases'
import {
  CheckSectorByNameRepositorySpy,
  UpdateSectorRepositorySpy,
  AddSectorRepositorySpy,
  mockUpdateSectorRepositoryParams,
  mockAddSectorRepositoryParams
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
    const params = mockUpdateSectorRepositoryParams()
    await sut.save(params)
    expect(updateSectorRepositorySpy.params).toEqual(params)
  })

  test('Should return false if UpdateSectorRepository returns false', async () => {
    const { sut, updateSectorRepositorySpy } = makeSut()
    updateSectorRepositorySpy.result = false
    const result = await sut.save(mockUpdateSectorRepositoryParams())
    expect(result).toBe(false)
  })

  test('Should return true if UpdateSectorRepository return true', async () => {
    const { sut } = makeSut()
    const isValid = await sut.save(mockUpdateSectorRepositoryParams())
    expect(isValid).toBe(true)
  })

  test('Should throw if UpdateSectorRepository throws', async () => {
    const { sut, updateSectorRepositorySpy } = makeSut()
    jest.spyOn(updateSectorRepositorySpy, 'update').mockRejectedValueOnce(new Error())
    const promise = sut.save(mockUpdateSectorRepositoryParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call AddSectorRepository with correct values', async () => {
    const { sut, addSectorRepositorySpy } = makeSut()
    const sector = mockAddSectorRepositoryParams()
    await sut.save(sector)
    expect(addSectorRepositorySpy.params).toEqual(sector)
  })

  test('Should return false if AddSectorRepository returns false', async () => {
    const { sut, addSectorRepositorySpy } = makeSut()
    addSectorRepositorySpy.result = false
    const result = await sut.save(mockAddSectorRepositoryParams())
    expect(result).toBe(false)
  })

  test('Should return true if AddSectorRepository return true', async () => {
    const { sut } = makeSut()
    const isValid = await sut.save(mockAddSectorRepositoryParams())
    expect(isValid).toBe(true)
  })

  test('Should throw if AddSectorRepository throws', async () => {
    const { sut, addSectorRepositorySpy } = makeSut()
    jest.spyOn(addSectorRepositorySpy, 'add').mockRejectedValueOnce(new Error())
    const promise = sut.save(mockAddSectorRepositoryParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call CheckSectorByNameRepository with correct value', async () => {
    const { sut, checkSectorByNameRepositorySpy } = makeSut()
    const Sector = mockAddSectorRepositoryParams()
    await sut.save(Sector)
    expect(checkSectorByNameRepositorySpy.name).toEqual(Sector.name)
  })

  test('Should return false if CheckSectorByNameRepository return true', async () => {
    const { sut, checkSectorByNameRepositorySpy } = makeSut()
    checkSectorByNameRepositorySpy.result = true
    const isValid = await sut.save(mockAddSectorRepositoryParams())
    expect(isValid).toBeFalsy()
  })

  test('Should throw if CheckSectorByNameRepository throws', async () => {
    const { sut, checkSectorByNameRepositorySpy } = makeSut()
    jest.spyOn(checkSectorByNameRepositorySpy, 'checkByName').mockRejectedValueOnce(new Error())
    const promise = sut.save(mockAddSectorRepositoryParams())
    await expect(promise).rejects.toThrow()
  })
})
