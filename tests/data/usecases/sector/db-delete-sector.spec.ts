import { DbDeleteSector } from '@/data/usecases'
import { DeleteSectorRepository } from '@/data/protocols'

import faker from 'faker'

class DeleteSectorRepositorySpy implements DeleteSectorRepository {
  result = true
  id = faker.datatype.number()
  async delete (id: number): Promise<DeleteSectorRepository.Result> {
    this.id = id
    return this.result
  }
}

describe('DbDeleteSector', () => {
  test('Should call DeleteSectorRepository with correct value', async () => {
    const deleteSectorRepositorySpy = new DeleteSectorRepositorySpy()
    const sut = new DbDeleteSector(deleteSectorRepositorySpy)
    const id = faker.datatype.number()
    await sut.delete({
      id
    })
    expect(deleteSectorRepositorySpy.id).toBe(id)
  })
})
