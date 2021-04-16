import {
  AddSectorRepository,
  CheckSectorByNameRepository,
  LoadSectorsRepository,
  DeleteSectorRepository,
  CheckSectorByIdRepository,
  UpdateSectorRepository
} from '@/data/protocols'
import {
  mockAddSectorParams,
  mockCheckSectorByIdParams,
  mockDeleteSectorParams,
  mockLoadSectorsParams,
  mockSectorModel,
  mockSectorsModel
} from '@/tests/domain/mocks'

import faker from 'faker'

export const mockAddSectorRepositoryParams = (): AddSectorRepository.Params => mockAddSectorParams()

export const mockUpdateSectorRepositoryParams = (): UpdateSectorRepository.Params => ({
  id: faker.datatype.number(),
  name: faker.name.findName()
})

export const mockCheckSectorByIdRepositoryParams = (): CheckSectorByIdRepository.Params => mockCheckSectorByIdParams()

export const mockDeleteSectorRepositoryParams = (): DeleteSectorRepository.Params => mockDeleteSectorParams()

export const mockLoadSectorsRepositoryParams = (): LoadSectorsRepository.Params => mockLoadSectorsParams()

export class AddSectorRepositorySpy implements AddSectorRepository {
  params: AddSectorRepository.Params
  result = true
  async add (params: AddSectorRepository.Params): Promise<AddSectorRepository.Result> {
    this.params = params
    return this.result
  }
}

export class CheckSectorByNameRepositorySpy implements CheckSectorByNameRepository {
  name: string
  result = false

  async checkByName (name: string): Promise<boolean> {
    this.name = name
    return this.result
  }
}

export class LoadSectorsRepositorySpy implements LoadSectorsRepository {
  models = mockSectorsModel()
  params: LoadSectorsRepository.Params
  async loadAll (params: LoadSectorsRepository.Params): Promise<LoadSectorsRepository.Model> {
    this.params = params
    return this.models
  }
}

export class DeleteSectorRepositorySpy implements DeleteSectorRepository {
  model = mockSectorModel()
  params: DeleteSectorRepository.Params
  async delete (params: DeleteSectorRepository.Params): Promise<DeleteSectorRepository.Model> {
    this.params = params
    return this.model
  }
}

export class CheckSectorByIdRepositorySpy implements CheckSectorByIdRepository {
  params: CheckSectorByIdRepository.Params
  result = true
  async checkById (params: CheckSectorByIdRepository.Params): Promise<CheckSectorByIdRepository.Result> {
    this.params = params
    return this.result
  }
}

export class UpdateSectorRepositorySpy implements UpdateSectorRepository {
  params: UpdateSectorRepository.Params
  result = true
  async update (params: UpdateSectorRepository.Params): Promise<UpdateSectorRepository.Result> {
    this.params = params
    return this.result
  }
}
