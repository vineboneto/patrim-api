import { AddOwnerRepository, UpdateOwnerRepository } from '@/data/protocols'
import { mockOwnerModel } from '@/tests/domain/mocks'

import faker from 'faker'

export const mockAddOwnerParams = (): AddOwnerRepository.Params => ({
  name: faker.name.findName(),
  sectorId: faker.datatype.number().toString()
})

export const mockUpdateOwnerParams = (): UpdateOwnerRepository.Params => ({
  id: faker.datatype.number().toString(),
  name: faker.name.findName(),
  sectorId: faker.datatype.number().toString()
})

export class AddOwnerRepositorySpy implements AddOwnerRepository {
  callsCount = 0
  params: AddOwnerRepository.Params
  model = mockOwnerModel()
  async add (owner: AddOwnerRepository.Params): Promise<AddOwnerRepository.Model> {
    this.callsCount++
    this.params = owner
    return this.model
  }
}

export class UpdateOwnerRepositorySpy implements UpdateOwnerRepository {
  callsCount = 0
  params: UpdateOwnerRepository.Params
  model = mockOwnerModel()
  async update (owner: UpdateOwnerRepository.Params): Promise<UpdateOwnerRepository.Model> {
    this.callsCount++
    this.params = owner
    return this.model
  }
}
