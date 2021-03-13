import { AddSector } from '@/domain/usecases'
import faker from 'faker'

export const mockAddSectorParams = (): AddSector.Params => ({
  name: faker.random.word()
})
