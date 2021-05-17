import { DbDeleteSector } from '@/data/usecases'
import { DeleteSectorRepositorySpy, CheckOwnerBySectorIdRepositorySpy } from '@/tests/data/mocks'
import { mockDeleteSectorParams } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbDeleteSector
  deleteSectorRepositorySpy: DeleteSectorRepositorySpy
  checkOwnerBySectorIdRepositorySpy: CheckOwnerBySectorIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const deleteSectorRepositorySpy = new DeleteSectorRepositorySpy()
  const checkOwnerBySectorIdRepositorySpy = new CheckOwnerBySectorIdRepositorySpy()
  const sut = new DbDeleteSector(deleteSectorRepositorySpy, checkOwnerBySectorIdRepositorySpy)
  return {
    sut,
    deleteSectorRepositorySpy,
    checkOwnerBySectorIdRepositorySpy
  }
}

describe('DbDeleteSector', () => {
  test('Should call DeleteSectorRepository with correct value', async () => {
    const { sut, deleteSectorRepositorySpy } = makeSut()
    const params = mockDeleteSectorParams()
    await sut.delete(params)
    expect(deleteSectorRepositorySpy.params).toEqual(params)
  })

  test('Should call CheckOwnerBySectorIdRepository with correct values', async () => {
    const { sut, checkOwnerBySectorIdRepositorySpy } = makeSut()
    const params = mockDeleteSectorParams()
    await sut.delete(params)
    expect(checkOwnerBySectorIdRepositorySpy.params).toEqual({ sectorId: params.id })
  })

  test('Should return null if CheckOwnerBySectorIdRepository return true', async () => {
    const { sut, checkOwnerBySectorIdRepositorySpy } = makeSut()
    checkOwnerBySectorIdRepositorySpy.result = true
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

  test('Should throws if CheckOwnerBySectorIdRepository throws', async () => {
    const { sut, checkOwnerBySectorIdRepositorySpy } = makeSut()
    jest.spyOn(checkOwnerBySectorIdRepositorySpy, 'checkBySectorId').mockRejectedValueOnce(new Error())
    const promise = sut.delete(mockDeleteSectorParams())
    await expect(promise).rejects.toThrow()
  })
})
