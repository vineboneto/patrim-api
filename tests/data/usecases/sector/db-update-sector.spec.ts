import { DbUpdateSector } from '@/data/usecases'
import {
  CheckSectorByNameRepositorySpy,
  LoadSectorNameByIdRepositorySpy,
  mockUpdateSectorRepositoryParams,
  UpdateSectorRepositorySpy
} from '@/tests/data/mocks'

type SutTypes = {
  sut: DbUpdateSector
  updateSectorRepositorySpy: UpdateSectorRepositorySpy
  loadSectorNameByIdRepositorySpy: LoadSectorNameByIdRepositorySpy
  checkSectorByNameRepositorySpy: CheckSectorByNameRepositorySpy
}

const makeSut = (): SutTypes => {
  const updateSectorRepositorySpy = new UpdateSectorRepositorySpy()
  const loadSectorNameByIdRepositorySpy = new LoadSectorNameByIdRepositorySpy()
  const checkSectorByNameRepositorySpy = new CheckSectorByNameRepositorySpy()
  const sut = new DbUpdateSector(
    updateSectorRepositorySpy,
    loadSectorNameByIdRepositorySpy,
    checkSectorByNameRepositorySpy
  )
  return {
    sut,
    updateSectorRepositorySpy,
    loadSectorNameByIdRepositorySpy,
    checkSectorByNameRepositorySpy
  }
}

describe('DbUpdateSector', () => {
  test('Should call UpdateSectorRepository with correct value', async () => {
    const { sut, updateSectorRepositorySpy } = makeSut()
    const params = mockUpdateSectorRepositoryParams()
    await sut.update(params)
    expect(updateSectorRepositorySpy.params).toEqual(params)
  })

  test('Should return null if UpdateSectorRepository returns null', async () => {
    const { sut, updateSectorRepositorySpy } = makeSut()
    updateSectorRepositorySpy.model = null
    const data = await sut.update(mockUpdateSectorRepositoryParams())
    expect(data).toBe(null)
  })

  test('Should return sector on success', async () => {
    const { sut, updateSectorRepositorySpy } = makeSut()
    const data = await sut.update(mockUpdateSectorRepositoryParams())
    expect(data).toEqual(updateSectorRepositorySpy.model)
  })

  test('Should throw if UpdateSectorRepository throws', async () => {
    const { sut, updateSectorRepositorySpy } = makeSut()
    jest.spyOn(updateSectorRepositorySpy, 'update').mockRejectedValueOnce(new Error())
    const promise = sut.update(mockUpdateSectorRepositoryParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call LoadSectorNameByIdRepository with correct values', async () => {
    const { sut, loadSectorNameByIdRepositorySpy } = makeSut()
    const params = mockUpdateSectorRepositoryParams()
    await sut.update(params)
    expect(loadSectorNameByIdRepositorySpy.id).toEqual(params.id)
  })

  test('Should return null if LoadSectorNameByIdRepository returns different name', async () => {
    const { sut, loadSectorNameByIdRepositorySpy, checkSectorByNameRepositorySpy } = makeSut()
    checkSectorByNameRepositorySpy.result = true
    loadSectorNameByIdRepositorySpy.model.name = 'differentName'
    const data = await sut.update(mockUpdateSectorRepositoryParams())
    expect(data).toBe(null)
  })

  test('Should throws if LoadSectorNameByIdRepository throw', async () => {
    const { sut, loadSectorNameByIdRepositorySpy } = makeSut()
    jest.spyOn(loadSectorNameByIdRepositorySpy, 'loadNameById').mockRejectedValueOnce(new Error())
    const promise = sut.update(mockUpdateSectorRepositoryParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call CheckSectorByNameRepository with correct value', async () => {
    const { sut, checkSectorByNameRepositorySpy } = makeSut()
    const params = mockUpdateSectorRepositoryParams()
    await sut.update(params)
    expect(checkSectorByNameRepositorySpy.name).toEqual(params.name)
  })

  test('Should return null if CheckSectorByNameRepository return true', async () => {
    const { sut, checkSectorByNameRepositorySpy, loadSectorNameByIdRepositorySpy } = makeSut()
    loadSectorNameByIdRepositorySpy.model.name = 'differentName'
    checkSectorByNameRepositorySpy.result = true
    const params = mockUpdateSectorRepositoryParams()
    const data = await sut.update(params)
    expect(data).toBe(null)
  })

  test('Should throws if CheckSectorByNameRepository throw', async () => {
    const { sut, loadSectorNameByIdRepositorySpy, checkSectorByNameRepositorySpy } = makeSut()
    loadSectorNameByIdRepositorySpy.model.name = 'differentName'
    jest.spyOn(checkSectorByNameRepositorySpy, 'checkByName').mockRejectedValueOnce(new Error())
    const promise = sut.update(mockUpdateSectorRepositoryParams())
    await expect(promise).rejects.toThrow()
  })
})
