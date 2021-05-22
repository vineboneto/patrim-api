import { SectorModel } from '@/domain/models'
import { LoadSectors, DeleteSector, AddSector, CheckSectorById, UpdateSector, LoadSectorById } from '@/domain/usecases'

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

export const mockAddSectorParams = (): AddSector.Params => ({
  name: faker.name.findName(),
  accountId: faker.datatype.number()
})

export const mockUpdateSectorParams = (): UpdateSector.Params => ({
  id: faker.datatype.number(),
  name: faker.name.findName(),
  accountId: faker.datatype.number()
})

export const mockCheckSectorByIdParams = (): CheckSectorById.Params => ({
  id: faker.datatype.number()
})

export const mockDeleteSectorParams = (): DeleteSector.Params => ({
  id: faker.datatype.number()
})

export const mockLoadSectorsParams = (): LoadSectors.Params => ({
  skip: faker.datatype.number(),
  take: faker.datatype.number(),
  accountId: faker.datatype.number()
})

export const mockLoadSectorByIdParams = (): LoadSectorById.Params => ({
  id: faker.datatype.number(),
  accountId: faker.datatype.number()
})

export class UpdateSectorSpy implements UpdateSector {
  params: UpdateSector.Params
  model = mockSectorModel()
  async update (sector: UpdateSector.Params): Promise<UpdateSector.Model> {
    this.params = sector
    return this.model
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

export class LoadSectorsSpy implements LoadSectors {
  params: LoadSectors.Params
  result = {
    model: mockSectorsModel(),
    count: mockSectorsModel().length
  }

  async load (params: LoadSectors.Params): Promise<LoadSectors.Model> {
    this.params = params
    return this.result
  }
}

export class LoadSectorByIdSpy implements LoadSectorById {
  model = mockSectorModel()
  params: LoadSectorById.Params
  async loadById (params: LoadSectorById.Params): Promise<LoadSectorById.Model> {
    this.params = params
    return this.model
  }
}

export class AddSectorSpy implements AddSector {
  params: AddSector.Params
  model = mockSectorModel()
  async add (sector: AddSector.Params): Promise<AddSector.Model> {
    this.params = sector
    return this.model
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
