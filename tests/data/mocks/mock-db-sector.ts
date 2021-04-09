import {
  AddSectorRepository,
  CheckSectorByNameRepository,
  LoadSectorsRepository,
  DeleteSectorRepository,
  LoadSectorByIdRepository
} from '@/data/protocols'
import { mockSectorModel, mockSectorsModel } from '@/tests/domain/mocks'

import faker from 'faker'

export class AddSectorRepositorySpy implements AddSectorRepository {
  params: AddSectorRepository.Params
  result = true
  async addSector (sector: AddSectorRepository.Params): Promise<AddSectorRepository.Model> {
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

export class LoadSectorByIdRepositorySpy implements LoadSectorByIdRepository {
  model = { id: faker.datatype.number() }
  id = faker.datatype.number()
  async loadById (id: number): Promise<LoadSectorByIdRepository.Model> {
    this.id = id
    return this.model
  }
}
