import { AddSector, LoadSectors } from '@/domain/usecases'
import { mockSectorModels } from '@/tests/domain/mocks'

export class AddSectorSpy implements AddSector {
  params: AddSector.Params
  result = true
  async add (sector: AddSector.Params): Promise<AddSector.Result> {
    this.params = sector
    return this.result
  }
}

export class LoadSectorsSpy implements LoadSectors {
  surveyModels = mockSectorModels()
  callsCount = 0
  async load (): Promise<LoadSectors.Result> {
    this.callsCount++
    return this.surveyModels
  }
}
