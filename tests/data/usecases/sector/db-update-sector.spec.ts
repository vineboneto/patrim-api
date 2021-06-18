import { DbUpdateSector } from '@/data/usecases'
import {
  CheckDataByFieldRepositorySpy,
  LoadSectorNameByIdRepositorySpy,
  UpdateSectorRepositorySpy
} from '@/tests/data/mocks'
import { mockUpdateSectorParams } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbUpdateSector
  updateSectorRepositorySpy: UpdateSectorRepositorySpy
  loadSectorNameByIdRepositorySpy: LoadSectorNameByIdRepositorySpy
  checkDataByFieldRepositorySpy: CheckDataByFieldRepositorySpy
}

const makeSut = (): SutTypes => {
  const updateSectorRepositorySpy = new UpdateSectorRepositorySpy()
  const loadSectorNameByIdRepositorySpy = new LoadSectorNameByIdRepositorySpy()
  const checkDataByFieldRepositorySpy = new CheckDataByFieldRepositorySpy()
  const sut = new DbUpdateSector(
    updateSectorRepositorySpy,
    loadSectorNameByIdRepositorySpy,
    checkDataByFieldRepositorySpy
  )
  return {
    sut,
    updateSectorRepositorySpy,
    loadSectorNameByIdRepositorySpy,
    checkDataByFieldRepositorySpy
  }
}

describe('DbUpdateSector', () => {
  test('Should call UpdateSectorRepository with correct value', async () => {
    const { sut, updateSectorRepositorySpy } = makeSut()
    const params = mockUpdateSectorParams()
    await sut.update(params)
    expect(updateSectorRepositorySpy.params).toEqual(params)
  })

  test('Should return null if UpdateSectorRepository returns null', async () => {
    const { sut, updateSectorRepositorySpy } = makeSut()
    updateSectorRepositorySpy.model = null
    const data = await sut.update(mockUpdateSectorParams())
    expect(data).toBe(null)
  })

  test('Should return sector on success', async () => {
    const { sut, updateSectorRepositorySpy, loadSectorNameByIdRepositorySpy } = makeSut()
    const params = mockUpdateSectorParams()
    loadSectorNameByIdRepositorySpy.model.name = 'name'
    params.name = 'name'
    const data = await sut.update(params)
    expect(data).toEqual(updateSectorRepositorySpy.model)
  })

  test('Should throw if UpdateSectorRepository throws', async () => {
    const { sut, updateSectorRepositorySpy } = makeSut()
    jest.spyOn(updateSectorRepositorySpy, 'update').mockRejectedValueOnce(new Error())
    const promise = sut.update(mockUpdateSectorParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call LoadSectorNameByIdRepository with correct values', async () => {
    const { sut, loadSectorNameByIdRepositorySpy } = makeSut()
    const params = mockUpdateSectorParams()
    await sut.update(params)
    expect(loadSectorNameByIdRepositorySpy.id).toEqual(params.id)
  })

  test('Should return null if LoadSectorNameByIdRepository returns different name', async () => {
    const { sut, loadSectorNameByIdRepositorySpy, checkDataByFieldRepositorySpy } = makeSut()
    checkDataByFieldRepositorySpy.result = true
    loadSectorNameByIdRepositorySpy.model.name = 'differentName'
    const data = await sut.update(mockUpdateSectorParams())
    expect(data).toBe(null)
  })

  test('Should throws if LoadSectorNameByIdRepository throw', async () => {
    const { sut, loadSectorNameByIdRepositorySpy } = makeSut()
    jest.spyOn(loadSectorNameByIdRepositorySpy, 'loadNameById').mockRejectedValueOnce(new Error())
    const promise = sut.update(mockUpdateSectorParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call CheckSectorByNameRepository with correct value', async () => {
    const { sut, checkDataByFieldRepositorySpy } = makeSut()
    const params = mockUpdateSectorParams()
    await sut.update(params)
    expect(checkDataByFieldRepositorySpy.params.value).toEqual(params.name)
    expect(checkDataByFieldRepositorySpy.params.accountId).toEqual(params.accountId)
  })

  test('Should return null if CheckSectorByNameRepository return true', async () => {
    const { sut, checkDataByFieldRepositorySpy, loadSectorNameByIdRepositorySpy } = makeSut()
    loadSectorNameByIdRepositorySpy.model.name = 'differentName'
    checkDataByFieldRepositorySpy.result = true
    const params = mockUpdateSectorParams()
    const data = await sut.update(params)
    expect(data).toBe(null)
  })

  test('Should throws if CheckSectorByNameRepository throw', async () => {
    const { sut, loadSectorNameByIdRepositorySpy, checkDataByFieldRepositorySpy } = makeSut()
    loadSectorNameByIdRepositorySpy.model.name = 'differentName'
    jest.spyOn(checkDataByFieldRepositorySpy, 'checkByField').mockRejectedValueOnce(new Error())
    const promise = sut.update(mockUpdateSectorParams())
    await expect(promise).rejects.toThrow()
  })
})
