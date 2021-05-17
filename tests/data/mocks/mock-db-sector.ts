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
  mockSectorModel,
  mockSectorsModel,
  mockUpdateCategoryParams
} from '@/tests/domain/mocks'

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
  model = { name: mockUpdateCategoryParams().name }
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
    return {
      model: this.models,
      count: this.models.length
    }
  }
}

export class CheckSectorByNameRepositorySpy implements CheckSectorByNameRepository {
  params: CheckSectorByNameRepository.Params
  result = false

  async checkByName (params: CheckSectorByNameRepository.Params): Promise<boolean> {
    this.params = params
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
