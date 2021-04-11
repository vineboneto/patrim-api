import { CheckPlaceById, LoadPlaces, SavePlace } from '@/domain/usecases'

import faker from 'faker'

export const mockPlaceModel = (): LoadPlaces.PlaceModel => ({
  id: faker.datatype.number().toString(),
  name: faker.name.findName(),
  userId: faker.datatype.number().toString()
})

export const mockPlacesModel = (): LoadPlaces.Model => ([
  mockPlaceModel(),
  mockPlaceModel(),
  mockPlaceModel()
])

export class SavePlaceSpy implements SavePlace {
  params: SavePlace.Params
  result = true
  async save (place: SavePlace.Params): Promise<SavePlace.Result> {
    this.params = place
    return this.result
  }
}

export class CheckPlaceByIdSpy implements CheckPlaceById {
  id: string
  result = true
  async checkById (id: string): Promise<CheckPlaceById.Result> {
    this.id = id
    return this.result
  }
}

export class LoadPlacesSpy implements LoadPlaces {
  placesModel = mockPlacesModel()
  callsCount = 0
  async load (): Promise<LoadPlaces.Model> {
    this.callsCount++
    return this.placesModel
  }
}
