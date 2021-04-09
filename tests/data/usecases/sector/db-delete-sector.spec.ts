import { DbDeleteSector } from '@/data/usecases'
import { DeleteSectorRepositorySpy } from '@/tests/data/mocks'
import { mockDeleteSectorParams } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbDeleteSector
  deleteSectorRepositorySpy: DeleteSectorRepositorySpy
}

const makeSut = (): SutTypes => {
  const deleteSectorRepositorySpy = new DeleteSectorRepositorySpy()
  const sut = new DbDeleteSector(deleteSectorRepositorySpy)
  return {
    sut,
    deleteSectorRepositorySpy
  }
}

describe('DbDeleteSector', () => {
  test('Should call DeleteSectorRepository with correct value', async () => {
    const { sut, deleteSectorRepositorySpy } = makeSut()
    const data = mockDeleteSectorParams()
    await sut.delete(data)
    expect(deleteSectorRepositorySpy.id).toBe(data.id)
  })

  test('Should return false if DeleteSectorRepository fails', async () => {
    const { sut, deleteSectorRepositorySpy } = makeSut()
    deleteSectorRepositorySpy.result = false
    const result = await sut.delete(mockDeleteSectorParams())
    expect(result).toBe(false)
  })

  test('Should return true on success', async () => {
    const { sut } = makeSut()
    const result = await sut.delete(mockDeleteSectorParams())
    expect(result).toBe(true)
  })
})
