import { SectorModel } from '@/domain/models'
import { LoadSectors, DeleteSector, SaveSector, CheckSectorById } from '@/domain/usecases'

import faker from 'faker'

export const mockSectorModel = (): SectorModel => ({
  id: faker.datatype.number().toString(),
  name: faker.name.findName()
})

export const mockSectorsModel = (): SectorModel[] => ([
  mockSectorModel(),
  mockSectorModel(),
  mockSectorModel()
])

export const mockDeleteSectorParams = (): DeleteSector.Params => ({
  id: faker.datatype.number().toString()
})

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

export class SaveSectorSpy implements SaveSector {
  params: SaveSector.Params
  result = true
  async save (sector: SaveSector.Params): Promise<SaveSector.Result> {
    this.params = sector
    return this.result
  }
}

export class CheckSectorByIdSpy implements CheckSectorById {
  id: string
  result = true
  async checkById (id: string): Promise<CheckSectorById.Result> {
    this.id = id
    return this.result
  }
}
