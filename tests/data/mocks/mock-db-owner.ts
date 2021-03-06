import {
  AddOwnerRepository,
  DeleteOwnerRepository,
  LoadOwnerByIdRepository,
  LoadOwnersRepository,
  UpdateOwnerRepository
} from '@/data/protocols'
import { mockOwnerModel, mockOwnersModel } from '@/tests/domain/mocks'

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

export class LoadOwnersRepositorySpy implements LoadOwnersRepository {
  params: LoadOwnersRepository.Params
  result = {
    model: mockOwnersModel(),
    count: mockOwnersModel().length
  }

  async loadAll (params: LoadOwnersRepository.Params): Promise<LoadOwnersRepository.Model> {
    this.params = params
    return this.result
  }
}

export class LoadOwnerByIdRepositorySpy implements LoadOwnerByIdRepository {
  params: LoadOwnerByIdRepository.Params
  model = mockOwnerModel()
  async loadById (params: LoadOwnerByIdRepository.Params): Promise<LoadOwnerByIdRepository.Model> {
    this.params = params
    return this.model
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
