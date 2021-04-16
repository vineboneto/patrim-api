import { LoadPatrimonyByOwnerId } from '@/domain/usecases'

import faker from 'faker'

export class LoadPatrimonyByOwnerIdSpy implements LoadPatrimonyByOwnerId {
  params: LoadPatrimonyByOwnerId.Params
  model = {
    id: faker.datatype.number(),
    number: faker.datatype.uuid()
  }

  async loadByOwnerId (params: LoadPatrimonyByOwnerId.Params): Promise<LoadPatrimonyByOwnerId.Model> {
    this.params = params
    return this.model
  }
}
