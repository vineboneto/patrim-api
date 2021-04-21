import { PlaceModel } from '@/domain/models'
import { CheckPlaceById, DeletePlace, LoadPlaces, SavePlace, UpdatePlace } from '@/domain/usecases'

import faker from 'faker'

export const mockPlaceModel = (): PlaceModel => ({
  id: faker.datatype.number(),
  name: faker.name.findName()
})

export const mockPlacesModel = (): PlaceModel[] => ([
  mockPlaceModel(),
  mockPlaceModel(),
  mockPlaceModel()
])

export const mockUpdatePlaceParams = (): UpdatePlace.Params => ({
  id: faker.datatype.number(),
  name: faker.name.findName()
})

export const mockCheckPlaceByIdParams = (): CheckPlaceById.Params => ({
  id: faker.datatype.number()
})

export const mockDeletePlaceParams = (): DeletePlace.Params => ({
  id: faker.datatype.number()
})

export const mockLoadPlacesParams = (): LoadPlaces.Params => ({
  skip: faker.datatype.number(),
  take: faker.datatype.number()
})

export class SavePlaceSpy implements SavePlace {
  params: SavePlace.Params
  model = mockPlaceModel()
  async save (place: SavePlace.Params): Promise<SavePlace.Model> {
    this.params = place
    return this.model
  }
}

export class UpdatePlaceSpy implements UpdatePlace {
  params: UpdatePlace.Params
  model = mockPlaceModel()
  async update (sector: UpdatePlace.Params): Promise<UpdatePlace.Model> {
    this.params = sector
    return this.model
  }
}

export class DeletePlaceSpy implements DeletePlace {
  params: DeletePlace.Params
  model = mockPlaceModel()
  async delete (params: DeletePlace.Params): Promise<DeletePlace.Model> {
    this.params = params
    return this.model
  }
}

export class CheckPlaceByIdSpy implements CheckPlaceById {
  params: CheckPlaceById.Params
  result = true
  async checkById (params: CheckPlaceById.Params): Promise<CheckPlaceById.Result> {
    this.params = params
    return this.result
  }
}

export class LoadPlacesSpy implements LoadPlaces {
  models = mockPlacesModel()
  params: LoadPlaces.Params
  async load (params: LoadPlaces.Params): Promise<LoadPlaces.Model> {
    this.params = params
    return this.models
  }
}
