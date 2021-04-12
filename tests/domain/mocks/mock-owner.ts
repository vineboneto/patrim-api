import faker from 'faker'
import { SaveOwner } from '@/domain/usecases'

export const mockOwnerModel = (): SaveOwner.Model => ({
  id: faker.datatype.number().toString(),
  name: faker.name.findName(),
  sectorId: faker.datatype.number().toString()
})
