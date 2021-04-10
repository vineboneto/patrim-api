import {
  AddSectorRepository,
  CheckSectorByNameRepository,
  LoadSectorsRepository,
  DeleteSectorRepository,
  CheckSectorByIdRepository,
  SaveSectorRepository
} from '@/data/protocols'
import { mockSectorModel, mockSectorsModel } from '@/tests/domain/mocks'

import faker from 'faker'

export class AddSectorRepositorySpy implements AddSectorRepository {
  params: AddSectorRepository.Params
  result = true
  async add (sector: AddSectorRepository.Params): Promise<AddSectorRepository.Model> {
    this.params = sector
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
  sectorModels = mockSectorsModel()
  callCount = 0
  async loadAll (): Promise<LoadSectorsRepository.Model> {
    this.callCount++
    return this.sectorModels
  }
}

export class DeleteSectorRepositorySpy implements DeleteSectorRepository {
  model = mockSectorModel()
  id = faker.datatype.number()
  async delete (id: number): Promise<DeleteSectorRepository.Model> {
    this.id = id
    return this.model
  }
}

export class CheckSectorByIdRepositorySpy implements CheckSectorByIdRepository {
  result = true
  id = faker.datatype.number()
  async checkById (id: number): Promise<CheckSectorByIdRepository.Result> {
    this.id = id
    return this.result
  }
}

export class SaveSectorRepositorySpy implements SaveSectorRepository {
  params: SaveSectorRepository.Params
  result = true
  async save (sector: SaveSectorRepository.Params): Promise<SaveSectorRepository.Result> {
    this.params = sector
    return this.result
  }
}
