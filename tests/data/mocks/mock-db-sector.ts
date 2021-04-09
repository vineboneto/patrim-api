import {
  AddSectorRepository,
  CheckSectorByNameRepository,
  LoadSectorsRepository,
  DeleteSectorRepository
} from '@/data/protocols'
import { mockSectorsModel } from '@/tests/domain/mocks'

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
    return await this.result
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
  result = true
  id = faker.datatype.number()
  async delete (id: number): Promise<DeleteSectorRepository.Result> {
    this.id = id
    return this.result
  }
}
