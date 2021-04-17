import { CheckPlaceById, SavePlace } from '@/domain/usecases'

import faker from 'faker'

export const mockPlaceModel = (): SavePlace.Model => ({
  id: faker.datatype.number(),
  name: faker.name.findName()
})

export const mockCheckPlaceByIdParams = (): CheckPlaceById.Params => ({
  id: faker.datatype.number()
})
