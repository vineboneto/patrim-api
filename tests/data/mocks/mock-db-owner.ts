import {
  AddOwnerRepository,
  CheckOwnerByIdRepository,
  CheckOwnerBySectorIdRepository,
  DeleteOwnerRepository,
  LoadOwnersRepository,
  UpdateOwnerRepository
} from '@/data/protocols'
import {
  mockAddOwnerParams,
  mockCheckOwnerByIdParams,
  mockDeleteOwnerParams,
  mockLoadOwnersParams,
  mockOwnerModel,
  mockOwnersModel
} from '@/tests/domain/mocks'

import faker from 'faker'

export const mockAddOwnerRepositoryParams = (): AddOwnerRepository.Params => mockAddOwnerParams()

export const mockCheckOwnerByIdRepositoryParams = (): CheckOwnerByIdRepository.Params => mockCheckOwnerByIdParams()

export const mockDeleteOwnerRepositoryParams = (): DeleteOwnerRepository.Params => mockDeleteOwnerParams()

export const mockLoadOwnersRepositoryParams = (): LoadOwnersRepository.Params => mockLoadOwnersParams()

export const mockUpdateOwnerRepositoryParams = (): UpdateOwnerRepository.Params => ({
  id: faker.datatype.number(),
  name: faker.name.findName(),
  sectorId: faker.datatype.number()
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
  params: CheckOwnerByIdRepository.Params
  result = true
  async checkById (params: CheckOwnerByIdRepository.Params): Promise<CheckOwnerByIdRepository.Result> {
    this.params = params
    return this.result
  }
}

export class LoadOwnersRepositorySpy implements LoadOwnersRepository {
  models = mockOwnersModel()
  params: LoadOwnersRepository.Params
  async loadAll (params: LoadOwnersRepository.Params): Promise<LoadOwnersRepository.Model> {
    this.params = params
    return this.models
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

export class CheckOwnerBySectorIdRepositorySpy implements CheckOwnerBySectorIdRepository {
  params: CheckOwnerBySectorIdRepository.Params
  result = false

  async checkBySectorId (params: CheckOwnerBySectorIdRepository.Params):
  Promise<CheckOwnerBySectorIdRepository.Result> {
    this.params = params
    return this.result
  }
}
