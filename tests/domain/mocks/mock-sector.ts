import { SectorModel } from '@/domain/models'
import { AddSector, LoadSectors, DeleteSector, SaveSector } from '@/domain/usecases'

import faker from 'faker'

export const mockAddSectorParams = (): AddSector.Params => ({
  name: faker.name.jobArea()
})

export const mockAddSectorsParams = (): AddSector.Params[] => ([
  mockAddSectorParams(),
  mockAddSectorParams(),
  mockAddSectorParams()
])

export const mockSectorModel = (): SectorModel => ({
  id: faker.datatype.number(),
  name: faker.name.findName()
})

export const mockSaveSectorParams = (): SaveSector.Params => ({
  id: faker.datatype.number(),
  name: faker.name.findName()
})

export const mockSectorsModel = (): SectorModel[] => ([
  mockSectorModel(),
  mockSectorModel(),
  mockSectorModel()
])

export const mockDeleteSectorParams = (): DeleteSector.Params => ({
  id: faker.datatype.number()
})

export class AddSectorSpy implements AddSector {
  params: AddSector.Params
  result = true
  async add (sector: AddSector.Params): Promise<AddSector.Result> {
    this.params = sector
    return this.result
  }
}

export class LoadSectorsSpy implements LoadSectors {
  sectorsModel = mockSectorsModel()
  callsCount = 0
  async load (): Promise<LoadSectors.Model> {
    this.callsCount++
    return this.sectorsModel
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
