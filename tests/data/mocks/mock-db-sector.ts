import {
  AddSectorRepository,
  LoadSectorsRepository,
  DeleteSectorRepository,
  UpdateSectorRepository,
  LoadSectorByIdRepository
} from '@/data/protocols'
import { mockSectorModel, mockSectorsModel } from '@/tests/domain/mocks'

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

export class LoadSectorByIdRepositorySpy implements LoadSectorByIdRepository {
  params: LoadSectorByIdRepository.Params
  model = mockSectorModel()
  async loadById (params: LoadSectorByIdRepository.Params): Promise<LoadSectorByIdRepository.Model> {
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
