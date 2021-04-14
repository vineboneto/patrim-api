import faker from 'faker'
import { CheckOwnerById, SaveOwner } from '@/domain/usecases'

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

export class CheckOwnerByIdSpy implements CheckOwnerById {
  id: string
  result = true
  async checkById (id: string): Promise<CheckOwnerById.Result> {
    this.id = id
    return this.result
  }
}
