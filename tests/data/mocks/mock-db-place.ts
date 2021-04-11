import {
  AddPlaceRepository,
  CheckPlaceByIdRepository,
  CheckPlaceByNameRepository,
  LoadPlacesRepository,
  UpdatePlaceRepository
} from '@/data/protocols'
import { mockPlacesModel } from '@/tests/domain/mocks'

import faker from 'faker'

export const mockAddPlaceParams = (): AddPlaceRepository.Params => ({
  name: faker.name.findName(),
  userId: faker.datatype.number().toString()
})

export const mockAddPlacesParams = (): AddPlaceRepository.Params[] => ([
  mockAddPlaceParams(),
  mockAddPlaceParams(),
  mockAddPlaceParams()
])

export const mockUpdatePlaceParams = (): UpdatePlaceRepository.Params => ({
  id: faker.datatype.number().toString(),
  name: faker.name.findName(),
  userId: faker.datatype.number().toString()
})

export class CheckPlaceByNameRepositorySpy implements CheckPlaceByNameRepository {
  name: string
  result = false

  async checkByName (name: string): Promise<CheckPlaceByNameRepository.Result> {
    this.name = name
    return this.result
  }
}

export class UpdatePlaceRepositorySpy implements UpdatePlaceRepository {
  callsCount = 0
  params: UpdatePlaceRepository.Params
  result = true
  async update (place: UpdatePlaceRepository.Params): Promise<UpdatePlaceRepository.Result> {
    this.callsCount++
    this.params = place
    return this.result
  }
}

export class AddPlaceRepositorySpy implements AddPlaceRepository {
  callsCount = 0
  params: AddPlaceRepository.Params
  result = true
  async add (place: AddPlaceRepository.Params): Promise<AddPlaceRepository.Result> {
    this.callsCount++
    this.params = place
    return this.result
  }
}

export class CheckPlaceByIdRepositorySpy implements CheckPlaceByIdRepository {
  result = true
  id = faker.datatype.number().toString()
  async checkById (id: string): Promise<CheckPlaceByIdRepository.Result> {
    this.id = id
    return this.result
  }
}

export class LoadPlacesRepositorySpy implements LoadPlacesRepository {
  sectorModels = mockPlacesModel()
  callCount = 0
  async loadAll (): Promise<LoadPlacesRepository.Model> {
    this.callCount++
    return this.sectorModels
  }
}
