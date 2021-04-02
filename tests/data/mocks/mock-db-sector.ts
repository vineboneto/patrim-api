import { AddSectorRepository, CheckSectorByNameRepository, LoadSectorsRepository } from '@/data/protocols'
import { mockSectorModels } from '@/tests/domain/mocks'

export class AddSectorRepositorySpy implements AddSectorRepository {
  params: AddSectorRepository.Params
  result = true
  async addSector (sector: AddSectorRepository.Params): Promise<AddSectorRepository.Result> {
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
  sectorModels = mockSectorModels()
  callCount = 0
  async loadAll (): Promise<LoadSectorsRepository.Result> {
    this.callCount++
    return this.sectorModels
  }
}
