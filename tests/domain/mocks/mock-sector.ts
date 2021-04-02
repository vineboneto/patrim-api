import { AddSector, LoadSectors } from '@/domain/usecases/'

import faker from 'faker'

export const mockAddSectorParams = (): AddSector.Params => ({
  name: faker.name.jobArea()
})

export const mockSectorModels = (): LoadSectors.Result => ([
  {
    id: faker.datatype.number(),
    name: faker.name.findName()
  },
  {
    id: faker.datatype.number(),
    name: faker.name.findName()
  },
  {
    id: faker.datatype.number(),
    name: faker.name.findName()
  }
])
