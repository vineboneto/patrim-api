import { DbAddSector } from '../../../src/data/usecases/db-add-sector'
import { AddSectorRepository, Result, Params } from '../../../src/data/protocols/add-sector-repository'

describe('DbAddSector', () => {
  test('Should call AddSectorRepository with correct values', async () => {
    class AddSectorRepositorySpy implements AddSectorRepository {
      params: Params
      result = true

      async addSector (params: Params): Promise<Result> {
        this.params = params
        return Promise.resolve(this.result)
      }
    }

    const addSectorRepositorySpy = new AddSectorRepositorySpy()
    const sut = new DbAddSector(addSectorRepositorySpy)
    const sector = {
      name: 'any_name'
    }
    await sut.add(sector)
    expect(addSectorRepositorySpy.params).toEqual(sector)
  })
})
