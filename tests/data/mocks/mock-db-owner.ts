import { AddOwnerRepository } from '@/data/protocols'
import { mockOwnerModel } from '@/tests/domain/mocks'

import faker from 'faker'

export const mockAddOwnerParams = (): AddOwnerRepository.Params => ({
  name: faker.name.findName(),
  sectorId: faker.datatype.number().toString()
})

export class AddOwnerRepositorySpy implements AddOwnerRepository {
  callsCount = 0
  params: AddOwnerRepository.Params
  model = mockOwnerModel()
  async add (owner: AddOwnerRepository.Params): Promise<AddOwnerRepository.Result> {
    this.callsCount++
    this.params = owner
    return this.model
  }
}
