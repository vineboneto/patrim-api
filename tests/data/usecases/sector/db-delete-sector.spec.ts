import { DbDeleteSector } from '@/data/usecases'
import { DeleteSectorRepositorySpy, CheckDataByFieldRepositorySpy } from '@/tests/data/mocks'
import { mockDeleteSectorParams } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbDeleteSector
  deleteSectorRepositorySpy: DeleteSectorRepositorySpy
  checkDataByFieldRepositorySpy: CheckDataByFieldRepositorySpy
}

const makeSut = (): SutTypes => {
  const deleteSectorRepositorySpy = new DeleteSectorRepositorySpy()
  const checkDataByFieldRepositorySpy = new CheckDataByFieldRepositorySpy()
  const sut = new DbDeleteSector(deleteSectorRepositorySpy, checkDataByFieldRepositorySpy)
  return {
    sut,
    deleteSectorRepositorySpy,
    checkDataByFieldRepositorySpy
  }
}

describe('DbDeleteSector', () => {
  test('Should call DeleteSectorRepository with correct value', async () => {
    const { sut, deleteSectorRepositorySpy } = makeSut()
    const params = mockDeleteSectorParams()
    await sut.delete(params)
    expect(deleteSectorRepositorySpy.params).toEqual({
      id: params.id,
      accountId: params.accountId
    })
  })

  test('Should call CheckDataByFieldRepository with correct values', async () => {
    const { sut, checkDataByFieldRepositorySpy } = makeSut()
    const params = mockDeleteSectorParams()
    await sut.delete(params)
    expect(checkDataByFieldRepositorySpy.params).toEqual({ value: params.id, accountId: params.accountId })
  })

  test('Should return null if CheckDataByFieldRepository return true', async () => {
    const { sut, checkDataByFieldRepositorySpy } = makeSut()
    checkDataByFieldRepositorySpy.result = true
    const result = await sut.delete(mockDeleteSectorParams())
    expect(result).toBeNull()
  })

  test('Should return sector deleted on DeleteSectorRepository succeeds', async () => {
    const { sut, deleteSectorRepositorySpy } = makeSut()
    const result = await sut.delete(mockDeleteSectorParams())
    expect(result).toEqual(deleteSectorRepositorySpy.model)
  })

  test('Should throws if DeleteSectorRepository throws', async () => {
    const { sut, deleteSectorRepositorySpy } = makeSut()
    jest.spyOn(deleteSectorRepositorySpy, 'delete').mockRejectedValueOnce(new Error())
    const promise = sut.delete(mockDeleteSectorParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should throws if CheckDataByFieldRepository throws', async () => {
    const { sut, checkDataByFieldRepositorySpy } = makeSut()
    jest.spyOn(checkDataByFieldRepositorySpy, 'checkByField').mockRejectedValueOnce(new Error())
    const promise = sut.delete(mockDeleteSectorParams())
    await expect(promise).rejects.toThrow()
  })
})
