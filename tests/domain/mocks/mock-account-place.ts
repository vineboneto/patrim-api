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
