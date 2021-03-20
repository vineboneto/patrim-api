import { DbAddSector } from '@/data/usecases/db-add-sector'
import { AddSectorRepositorySpy } from '@/tests/data/mocks/mock-add-sector-repository'
import { mockAddSectorParams } from '@/tests/domain/mocks/mock-add-sector'

type SutTypes = {
  sut: DbAddSector
  addSectorRepositorySpy: AddSectorRepositorySpy
}

const makeSut = (): SutTypes => {
  const addSectorRepositorySpy = new AddSectorRepositorySpy()
  const sut = new DbAddSector(addSectorRepositorySpy)
  return {
    sut,
    addSectorRepositorySpy
  }
}

describe('DbAddSector', () => {
  test('Should call AddSectorRepository with correct values', async () => {
    const { sut, addSectorRepositorySpy } = makeSut()
    const sector = mockAddSectorParams()
    await sut.add(sector)
    expect(addSectorRepositorySpy.params).toEqual(sector)
  })

  test('Should DbAddSector return false if AddSectorRepository  return false', async () => {
    const { sut, addSectorRepositorySpy } = makeSut()
    addSectorRepositorySpy.result = false
    const isValid = await sut.add(mockAddSectorParams())
    expect(isValid).toBe(false)
  })
})
