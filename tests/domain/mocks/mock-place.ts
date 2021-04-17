import { PlaceModel } from '@/domain/models'
import { CheckPlaceById, DeletePlace, SavePlace } from '@/domain/usecases'

import faker from 'faker'

export const mockPlaceModel = (): PlaceModel => ({
  id: faker.datatype.number(),
  name: faker.name.findName()
})

export const mockCheckPlaceByIdParams = (): CheckPlaceById.Params => ({
  id: faker.datatype.number()
})

export const mockDeletePlaceParams = (): DeletePlace.Params => ({
  id: faker.datatype.number()
})

export class SavePlaceSpy implements SavePlace {
  params: SavePlace.Params
  model = mockPlaceModel()
  async save (place: SavePlace.Params): Promise<SavePlace.Model> {
    this.params = place
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
