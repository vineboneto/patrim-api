import { DeleteSectorController } from '@/presentation/controllers'
import { DeleteSector } from '@/domain/usecases'
import { mockSectorModel } from '@/tests/domain/mocks'

import faker from 'faker'

class DeleteSectorSpy implements DeleteSector {
  params: DeleteSector.Params
  model = mockSectorModel()
  async delete (params: DeleteSector.Params): Promise<DeleteSector.Model> {
    this.params = params
    return this.model
  }
}

describe('DeleteSectorController', () => {
  test('Should call DeleteSector with correct value', async () => {
    const deleteSectorSpy = new DeleteSectorSpy()
    const sut = new DeleteSectorController(deleteSectorSpy)
    const id = faker.datatype.number().toString()
    await sut.handle({ id })
    expect(deleteSectorSpy.params).toEqual({ id: Number(id) })
  })
})
