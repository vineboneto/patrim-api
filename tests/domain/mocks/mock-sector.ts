import { AddSector } from '@/domain/usecases/add-sector'

import faker from 'faker'

export const mockAddSectorParams = (): AddSector.Params => ({
  name: faker.name.jobArea()
})
