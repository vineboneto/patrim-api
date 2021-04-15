import { mockLoadPatrimonyByOwnerIdModel } from '@/tests/domain/mocks'
import { CheckPatrimonyByOwnerIdRepository, LoadPatrimonyByOwnerIdRepository } from '@/data/protocols'

import faker from 'faker'

export const mockLoadPatrimonyByOwnerIdRepositoryModel = ():
LoadPatrimonyByOwnerIdRepository.Model => mockLoadPatrimonyByOwnerIdModel()

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

export class CheckPatrimonyByOwnerIdRepositorySpy implements CheckPatrimonyByOwnerIdRepository {
  params: CheckPatrimonyByOwnerIdRepository.Params
  result = false

  async checkByOwnerId (params: CheckPatrimonyByOwnerIdRepository.Params):
  Promise<CheckPatrimonyByOwnerIdRepository.Result> {
    this.params = params
    return this.result
  }
}
