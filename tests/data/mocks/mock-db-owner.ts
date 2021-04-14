import { AddOwnerRepository, CheckOwnerByIdRepository, UpdateOwnerRepository } from '@/data/protocols'
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
  params: AddOwnerRepository.Params
  model = mockOwnerModel()
  async add (owner: AddOwnerRepository.Params): Promise<AddOwnerRepository.Model> {
    this.params = owner
    return this.model
  }
}

export class UpdateOwnerRepositorySpy implements UpdateOwnerRepository {
  params: UpdateOwnerRepository.Params
  model = mockOwnerModel()
  async update (owner: UpdateOwnerRepository.Params): Promise<UpdateOwnerRepository.Model> {
    this.params = owner
    return this.model
  }
}

export class CheckOwnerByIdRepositorySpy implements CheckOwnerByIdRepository {
  result = true
  id = faker.datatype.number().toString()
  async checkById (id: string): Promise<CheckOwnerByIdRepository.Result> {
    this.id = id
    return this.result
  }
}
