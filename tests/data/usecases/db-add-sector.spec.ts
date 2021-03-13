import { DbAddSector } from '@/data/usecases'
import { AddSectorRepositorySpy } from '@/tests/data/mocks'
import faker from 'faker'

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
    const sector = {
      name: faker.random.word()
    }
    await sut.add(sector)
    expect(addSectorRepositorySpy.params).toEqual(sector)
  })
})
