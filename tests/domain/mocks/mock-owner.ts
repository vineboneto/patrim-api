import faker from 'faker'
import { SaveOwner } from '@/domain/usecases'

export const mockOwnerModel = (): SaveOwner.Model => ({
  id: faker.datatype.number().toString(),
  name: faker.name.findName(),
  sectorId: faker.datatype.number().toString()
})

export class SaveOwnerSpy implements SaveOwner {
  params: SaveOwner.Params
  model = mockOwnerModel()
  async save (owner: SaveOwner.Params): Promise<SaveOwner.Model> {
    this.params = owner
    return this.model
  }
}
