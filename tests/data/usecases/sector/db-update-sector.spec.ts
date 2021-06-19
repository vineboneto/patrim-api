import { DbUpdateSector } from '@/data/usecases'
import {
  CheckDataByFieldRepositorySpy,
  LoadDataFieldByIdRepositorySpy,
  UpdateSectorRepositorySpy
} from '@/tests/data/mocks'
import { mockUpdateSectorParams } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbUpdateSector
  updateSectorRepositorySpy: UpdateSectorRepositorySpy
  loadDataFieldByIdRepositorySpy: LoadDataFieldByIdRepositorySpy
  checkDataByFieldRepositorySpy: CheckDataByFieldRepositorySpy
}

const makeSut = (): SutTypes => {
  const updateSectorRepositorySpy = new UpdateSectorRepositorySpy()
  const loadDataFieldByIdRepositorySpy = new LoadDataFieldByIdRepositorySpy()
  loadDataFieldByIdRepositorySpy.data = { name: 'any_name' }
  const checkDataByFieldRepositorySpy = new CheckDataByFieldRepositorySpy()
  const sut = new DbUpdateSector(
    updateSectorRepositorySpy,
    loadDataFieldByIdRepositorySpy,
    checkDataByFieldRepositorySpy
  )
  return {
    sut,
    updateSectorRepositorySpy,
    loadDataFieldByIdRepositorySpy,
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
    const { sut, updateSectorRepositorySpy, loadDataFieldByIdRepositorySpy } = makeSut()
    const params = mockUpdateSectorParams()
    loadDataFieldByIdRepositorySpy.data.name = 'name'
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

  test('Should call LoadDataFieldByIdRepository with correct values', async () => {
    const { sut, loadDataFieldByIdRepositorySpy } = makeSut()
    const params = mockUpdateSectorParams()
    await sut.update(params)
    expect(loadDataFieldByIdRepositorySpy.id).toEqual(params.id)
  })

  test('Should return null if LoadDataFieldByIdRepository returns different name', async () => {
    const { sut, loadDataFieldByIdRepositorySpy, checkDataByFieldRepositorySpy } = makeSut()
    checkDataByFieldRepositorySpy.result = true
    loadDataFieldByIdRepositorySpy.data.name = 'differentName'
    const data = await sut.update(mockUpdateSectorParams())
    expect(data).toBe(null)
  })

  test('Should throws if LoadDataFieldByIdRepository throw', async () => {
    const { sut, loadDataFieldByIdRepositorySpy } = makeSut()
    jest.spyOn(loadDataFieldByIdRepositorySpy, 'loadFieldById').mockRejectedValueOnce(new Error())
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
    const { sut, checkDataByFieldRepositorySpy, loadDataFieldByIdRepositorySpy } = makeSut()
    loadDataFieldByIdRepositorySpy.data.name = 'differentName'
    checkDataByFieldRepositorySpy.result = true
    const params = mockUpdateSectorParams()
    const data = await sut.update(params)
    expect(data).toBe(null)
  })

  test('Should throws if CheckSectorByNameRepository throw', async () => {
    const { sut, loadDataFieldByIdRepositorySpy, checkDataByFieldRepositorySpy } = makeSut()
    loadDataFieldByIdRepositorySpy.data.name = 'differentName'
    jest.spyOn(checkDataByFieldRepositorySpy, 'checkByField').mockRejectedValueOnce(new Error())
    const promise = sut.update(mockUpdateSectorParams())
    await expect(promise).rejects.toThrow()
  })
})
