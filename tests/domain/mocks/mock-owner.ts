import { CheckOwnerById, SaveOwner } from '@/domain/usecases'
import { OwnerModel } from '@/domain/models'

import faker from 'faker'

export const mockOwnerModel = (): OwnerModel => ({
  id: faker.datatype.number().toString(),
  name: faker.name.findName(),
  sectorId: faker.datatype.number().toString()
})

export const mockOwnersModel = (): OwnerModel[] => ([
  mockOwnerModel(),
  mockOwnerModel(),
  mockOwnerModel()
])

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
