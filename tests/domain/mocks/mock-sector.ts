import { SectorModel } from '@/domain/models'
import { LoadSectors, DeleteSector, SaveSector, CheckSectorById } from '@/domain/usecases'

import faker from 'faker'

export const mockSectorModel = (): SectorModel => ({
  id: faker.datatype.number(),
  name: faker.name.findName()
})

export const mockSectorsModel = (): SectorModel[] => ([
  mockSectorModel(),
  mockSectorModel(),
  mockSectorModel()
])

export const mockAddSectorParams = (): SaveSector.Params => ({
  name: faker.name.findName()
})

export const mockCheckSectorByIdParams = (): CheckSectorById.Params => ({
  id: faker.datatype.number()
})

export const mockDeleteSectorParams = (): DeleteSector.Params => ({
  id: faker.datatype.number()
})

export class LoadSectorsSpy implements LoadSectors {
  models = mockSectorsModel()
  callsCount = 0
  async load (): Promise<LoadSectors.Model> {
    this.callsCount++
    return this.models
  }
}

export class DeleteSectorSpy implements DeleteSector {
  params: DeleteSector.Params
  model = mockSectorModel()
  async delete (params: DeleteSector.Params): Promise<DeleteSector.Model> {
    this.params = params
    return this.model
  }
}

export class SaveSectorSpy implements SaveSector {
  params: SaveSector.Params
  result = true
  async save (sector: SaveSector.Params): Promise<SaveSector.Result> {
    this.params = sector
    return this.result
  }
}

export class CheckSectorByIdSpy implements CheckSectorById {
  params: CheckSectorById.Params
  result = true
  async checkById (params: CheckSectorById.Params): Promise<CheckSectorById.Result> {
    this.params = params
    return this.result
  }
}
