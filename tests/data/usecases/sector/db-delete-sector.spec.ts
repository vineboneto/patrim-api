import { DbDeleteSector } from '@/data/usecases'
import { DeleteSectorRepositorySpy, CheckSectorByIdRepositorySpy } from '@/tests/data/mocks'
import { mockDeleteSectorParams } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbDeleteSector
  deleteSectorRepositorySpy: DeleteSectorRepositorySpy
  checkSectorByIdRepositorySpy: CheckSectorByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const deleteSectorRepositorySpy = new DeleteSectorRepositorySpy()
  const checkSectorByIdRepositorySpy = new CheckSectorByIdRepositorySpy()
  const sut = new DbDeleteSector(deleteSectorRepositorySpy, checkSectorByIdRepositorySpy)
  return {
    sut,
    deleteSectorRepositorySpy,
    checkSectorByIdRepositorySpy
  }
}

describe('DbDeleteSector', () => {
  test('Should call DeleteSectorRepository with correct value', async () => {
    const { sut, deleteSectorRepositorySpy } = makeSut()
    const { id } = mockDeleteSectorParams()
    await sut.delete({ id })
    expect(deleteSectorRepositorySpy.id).toBe(id)
  })

  test('Should call CheckSectorByIdRepository with correct values', async () => {
    const { sut, checkSectorByIdRepositorySpy } = makeSut()
    const { id } = mockDeleteSectorParams()
    await sut.delete({ id })
    expect(checkSectorByIdRepositorySpy.id).toBe(id)
  })

  test('Should return false if CheckSectorByIdRepository return false', async () => {
    const { sut, checkSectorByIdRepositorySpy } = makeSut()
    checkSectorByIdRepositorySpy.result = false
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

  test('Should throws if CheckSectorByIdRepository throws', async () => {
    const { sut, checkSectorByIdRepositorySpy } = makeSut()
    jest.spyOn(checkSectorByIdRepositorySpy, 'checkById').mockRejectedValueOnce(new Error())
    const promise = sut.delete(mockDeleteSectorParams())
    await expect(promise).rejects.toThrow()
  })
})
