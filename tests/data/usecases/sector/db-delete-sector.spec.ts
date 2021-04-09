import { DbDeleteSector } from '@/data/usecases'
import { DeleteSectorRepositorySpy, LoadSectorByIdRepositorySpy } from '@/tests/data/mocks'
import { mockDeleteSectorParams } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbDeleteSector
  deleteSectorRepositorySpy: DeleteSectorRepositorySpy
  loadSectorByIdRepositorySpy: LoadSectorByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const deleteSectorRepositorySpy = new DeleteSectorRepositorySpy()
  const loadSectorByIdRepositorySpy = new LoadSectorByIdRepositorySpy()
  const sut = new DbDeleteSector(deleteSectorRepositorySpy, loadSectorByIdRepositorySpy)
  return {
    sut,
    deleteSectorRepositorySpy,
    loadSectorByIdRepositorySpy
  }
}

describe('DbDeleteSector', () => {
  test('Should call DeleteSectorRepository with correct value', async () => {
    const { sut, deleteSectorRepositorySpy } = makeSut()
    const { id } = mockDeleteSectorParams()
    await sut.delete({ id })
    expect(deleteSectorRepositorySpy.id).toBe(id)
  })

  test('Should call LoadSectorByIdRepository with correct values', async () => {
    const { sut, loadSectorByIdRepositorySpy } = makeSut()
    const { id } = mockDeleteSectorParams()
    await sut.delete({ id })
    expect(loadSectorByIdRepositorySpy.id).toBe(id)
  })

  test('Should throws if DeleteSectorRepository throws', async () => {
    const { sut, deleteSectorRepositorySpy } = makeSut()
    jest.spyOn(deleteSectorRepositorySpy, 'delete').mockRejectedValueOnce(new Error())
    const promise = sut.delete(mockDeleteSectorParams())
    await expect(promise).rejects.toThrow()
  })
})
