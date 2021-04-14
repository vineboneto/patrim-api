import {
  AddOwnerRepository,
  CheckOwnerByIdRepository,
  DeleteOwnerRepository,
  LoadOwnersRepository,
  UpdateOwnerRepository
} from '@/data/protocols'
import { mockOwnerModel, mockOwnersModel } from '@/tests/domain/mocks'

import faker from 'faker'

export const mockAddOwnerParams = (): AddOwnerRepository.Params => ({
  name: faker.name.findName(),
  sectorId: faker.datatype.number()
})

export const mockUpdateOwnerParams = (): UpdateOwnerRepository.Params => ({
  id: faker.datatype.number().toString(),
  name: faker.name.findName(),
  sectorId: faker.datatype.number()
})

export const mockLoadOwnersParams = (): LoadOwnersRepository.Params => ({
  skip: faker.datatype.number(),
  take: faker.datatype.number()
})

export const mockDeleteOwnerParams = (): DeleteOwnerRepository.Params => ({
  id: faker.datatype.number()
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

export class LoadOwnersRepositorySpy implements LoadOwnersRepository {
  ownersModel = mockOwnersModel()
  params: LoadOwnersRepository.Params
  async loadAll (params: LoadOwnersRepository.Params): Promise<LoadOwnersRepository.Model> {
    this.params = params
    return this.ownersModel
  }
}

export class DeleteOwnerRepositorySpy implements DeleteOwnerRepository {
  model = mockOwnerModel()
  params: DeleteOwnerRepository.Params
  async delete (params: DeleteOwnerRepository.Params): Promise<DeleteOwnerRepository.Model> {
    this.params = params
    return this.model
  }
}
