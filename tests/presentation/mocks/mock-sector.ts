import { AddSector, LoadSectors } from '@/domain/usecases'
import { mockSectorsModel } from '@/tests/domain/mocks'

export class AddSectorSpy implements AddSector {
  params: AddSector.Params
  result = true
  async add (sector: AddSector.Params): Promise<AddSector.Result> {
    this.params = sector
    return this.result
  }
}

export class LoadSectorsSpy implements LoadSectors {
  surveyModels = mockSectorsModel()
  callsCount = 0
  async load (): Promise<LoadSectors.Model> {
    this.callsCount++
    return this.surveyModels
  }
}
