import { DbAddSector } from '@/data/usecases/db-add-sector'
import { AddSectorRepository } from '@/data/protocols/add-sector-repository'

class AddSectorRepositorySpy implements AddSectorRepository {
  params: AddSectorRepository.Params
  result = true
  async addSector (sector: AddSectorRepository.Params): Promise<AddSectorRepository.Result> {
    this.params = sector
    return this.result
  }
}

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
    const sector = { name: 'any_name' }
    await sut.add(sector)
    expect(addSectorRepositorySpy.params).toEqual(sector)
  })

  test('Should DbAddSector return false if AddSectorRepository  return false', async () => {
    const { sut, addSectorRepositorySpy } = makeSut()
    addSectorRepositorySpy.result = false
    const sector = { name: 'any_name' }
    const isValid = await sut.add(sector)
    expect(isValid).toBe(false)
  })
})
