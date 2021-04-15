import { LoadPatrimonyByOwnerId } from '@/domain/usecases'

import faker from 'faker'

export const mockLoadPatrimonyByOwnerIdModel = ():
LoadPatrimonyByOwnerId.Model => ({
  id: faker.datatype.number(),
  number: faker.datatype.uuid()
})

export class LoadPatrimonyByOwnerIdSpy implements LoadPatrimonyByOwnerId {
  params: LoadPatrimonyByOwnerId.Params
  model = mockLoadPatrimonyByOwnerIdModel()

  async loadByOwnerId (params: LoadPatrimonyByOwnerId.Params): Promise<LoadPatrimonyByOwnerId.Model> {
    this.params = params
    return this.model
  }
}
