import {
  AddSectorRepository,
  CheckSectorByNameRepository,
  LoadSectorsRepository,
  DeleteSectorRepository,
  CheckSectorByIdRepository,
  UpdateSectorRepository
} from '@/data/protocols'
import { mockSectorModel, mockSectorsModel } from '@/tests/domain/mocks'

import faker from 'faker'

export const mockUpdateSectorParams = (): UpdateSectorRepository.Params => ({
  id: faker.datatype.number().toString(),
  name: faker.name.findName()
})

export const mockAddSectorParams = (): AddSectorRepository.Params => ({
  name: faker.name.jobArea()
})

export const mockAddSectorsParams = (): AddSectorRepository.Params[] => ([
  mockAddSectorParams(),
  mockAddSectorParams(),
  mockAddSectorParams()
])

export class AddSectorRepositorySpy implements AddSectorRepository {
  callsCount = 0
  params: AddSectorRepository.Params
  result = true
  async add (sector: AddSectorRepository.Params): Promise<AddSectorRepository.Model> {
    this.callsCount++
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
  id = faker.datatype.number().toString()
  async delete (id: string): Promise<DeleteSectorRepository.Model> {
    this.id = id
    return this.model
  }
}

export class CheckSectorByIdRepositorySpy implements CheckSectorByIdRepository {
  result = true
  id = faker.datatype.number().toString()
  async checkById (id: string): Promise<CheckSectorByIdRepository.Result> {
    this.id = id
    return this.result
  }
}

export class UpdateSectorRepositorySpy implements UpdateSectorRepository {
  callsCount = 0
  params: UpdateSectorRepository.Params
  result = true
  async update (sector: UpdateSectorRepository.Params): Promise<UpdateSectorRepository.Result> {
    this.callsCount++
    this.params = sector
    return this.result
  }
}
