import { AddAccountPlace } from '@/domain/usecases'

import faker from 'faker'

export const mockAccountPlaceModel = (): AddAccountPlace.Model => ({
  id: faker.datatype.number(),
  accountId: faker.datatype.number(),
  placeId: faker.datatype.number()
})

export const mockAddAccountPlaceParams = (): AddAccountPlace.Params => ({
  accountId: faker.datatype.number(),
  placeId: faker.datatype.number()
})

export class AddAccountPlaceSpy implements AddAccountPlace {
  params: AddAccountPlace.Params
  model = mockAccountPlaceModel()
  async add (params: AddAccountPlace.Params): Promise<AddAccountPlace.Model> {
    this.params = params
    return this.model
  }
}
