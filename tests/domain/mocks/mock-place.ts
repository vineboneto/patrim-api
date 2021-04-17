import { SavePlace } from '@/domain/usecases'

import faker from 'faker'

export const mockPlaceModel = (): SavePlace.Model => ({
  id: faker.datatype.number(),
  name: faker.name.findName()
})
