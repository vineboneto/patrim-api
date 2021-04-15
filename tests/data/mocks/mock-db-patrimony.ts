import { LoadPatrimonyByOwnerIdRepository } from '@/data/protocols'

import faker from 'faker'

export const mockLoadPatrimonyByOwnerIdRepositoryModel = ():
LoadPatrimonyByOwnerIdRepository.Model => ({
  id: faker.datatype.number(),
  number: faker.datatype.uuid()
})

export const mockLoadPatrimonyByOwnerIdRepositoryParams = ():
LoadPatrimonyByOwnerIdRepository.Params => ({
  ownerId: faker.datatype.number()
})

export class LoadPatrimonyByOwnerIdRepositorySpy implements LoadPatrimonyByOwnerIdRepository {
  params: LoadPatrimonyByOwnerIdRepository.Params
  model = mockLoadPatrimonyByOwnerIdRepositoryModel()

  async loadByOwnerId (params: LoadPatrimonyByOwnerIdRepository.Params):
  Promise<LoadPatrimonyByOwnerIdRepository.Model> {
    this.params = params
    return this.model
  }
}
