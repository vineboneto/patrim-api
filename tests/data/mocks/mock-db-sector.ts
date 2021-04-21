import {
  AddSectorRepository,
  CheckSectorByNameRepository,
  LoadSectorsRepository,
  DeleteSectorRepository,
  CheckSectorByIdRepository,
  UpdateSectorRepository,
  LoadSectorNameByIdRepository
} from '@/data/protocols'
import {
  mockAddSectorParams,
  mockCheckSectorByIdParams,
  mockDeleteSectorParams,
  mockLoadSectorsParams,
  mockSectorModel,
  mockSectorsModel,
  mockUpdateSectorParams
} from '@/tests/domain/mocks'

export const mockAddSectorRepositoryParams = (): AddSectorRepository.Params => mockAddSectorParams()

export const mockUpdateSectorRepositoryParams = (): UpdateSectorRepository.Params => mockUpdateSectorParams()

export const mockCheckSectorByIdRepositoryParams = (): CheckSectorByIdRepository.Params => mockCheckSectorByIdParams()

export const mockDeleteSectorRepositoryParams = (): DeleteSectorRepository.Params => mockDeleteSectorParams()

export const mockLoadSectorsRepositoryParams = (): LoadSectorsRepository.Params => mockLoadSectorsParams()

export class AddSectorRepositorySpy implements AddSectorRepository {
  params: AddSectorRepository.Params
  model = mockSectorModel()
  async add (params: AddSectorRepository.Params): Promise<AddSectorRepository.Model> {
    this.params = params
    return this.model
  }
}

export class UpdateSectorRepositorySpy implements UpdateSectorRepository {
  params: UpdateSectorRepository.Params
  model = mockSectorModel()
  async update (params: UpdateSectorRepository.Params): Promise<UpdateSectorRepository.Model> {
    this.params = params
    return this.model
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

export class LoadSectorNameByIdRepositorySpy implements LoadSectorNameByIdRepository {
  id: number
  model = { name: mockUpdateSectorRepositoryParams().name }
  async loadNameById (id: number): Promise<LoadSectorNameByIdRepository.Model> {
    this.id = id
    return this.model
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

export class CheckSectorByNameRepositorySpy implements CheckSectorByNameRepository {
  name: string
  result = false

  async checkByName (name: string): Promise<boolean> {
    this.name = name
    return this.result
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
