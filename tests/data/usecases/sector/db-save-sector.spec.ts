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

  test('Should return null if UpdateSectorRepository returns null', async () => {
    const { sut, updateSectorRepositorySpy } = makeSut()
    updateSectorRepositorySpy.model = null
    const model = await sut.save(mockUpdateSectorRepositoryParams())
    expect(model).toBe(null)
  })

  test('Should return sector if UpdateSectorRepository return sector', async () => {
    const { sut, updateSectorRepositorySpy } = makeSut()
    const model = await sut.save(mockUpdateSectorRepositoryParams())
    expect(model).toEqual(updateSectorRepositorySpy.model)
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

  test('Should return null if AddSectorRepository returns null', async () => {
    const { sut, addSectorRepositorySpy } = makeSut()
    addSectorRepositorySpy.model = null
    const model = await sut.save(mockAddSectorRepositoryParams())
    expect(model).toBe(null)
  })

  test('Should return sector if AddSectorRepository return sector', async () => {
    const { sut, addSectorRepositorySpy } = makeSut()
    const model = await sut.save(mockAddSectorRepositoryParams())
    expect(model).toEqual(addSectorRepositorySpy.model)
  })

  test('Should throw if AddSectorRepository throws', async () => {
    const { sut, addSectorRepositorySpy } = makeSut()
    jest.spyOn(addSectorRepositorySpy, 'add').mockRejectedValueOnce(new Error())
    const promise = sut.save(mockAddSectorRepositoryParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call CheckSectorByNameRepository with correct value', async () => {
    const { sut, checkSectorByNameRepositorySpy } = makeSut()
    const sector = mockAddSectorRepositoryParams()
    await sut.save(sector)
    expect(checkSectorByNameRepositorySpy.name).toEqual(sector.name)
  })

  test('Should return false if CheckSectorByNameRepository return true', async () => {
    const { sut, checkSectorByNameRepositorySpy } = makeSut()
    checkSectorByNameRepositorySpy.result = true
    const model = await sut.save(mockAddSectorRepositoryParams())
    expect(model).toBeFalsy()
  })

  test('Should throw if CheckSectorByNameRepository throws', async () => {
    const { sut, checkSectorByNameRepositorySpy } = makeSut()
    jest.spyOn(checkSectorByNameRepositorySpy, 'checkByName').mockRejectedValueOnce(new Error())
    const promise = sut.save(mockAddSectorRepositoryParams())
    await expect(promise).rejects.toThrow()
  })
})
