import { CheckPlaceByNameRepository } from '@/data/protocols'
import { SavePlace } from '@/domain/usecases'

import faker from 'faker'

export const mockAddPlaceParams = (): SavePlace.Params => ({
  id: faker.datatype.number(),
  name: faker.name.findName(),
  userId: faker.datatype.number()
})

export class CheckPlaceByNameRepositorySpy implements CheckPlaceByNameRepository {
  name: string
  result = false

  async checkByName (name: string): Promise<CheckPlaceByNameRepository.Result> {
    this.name = name
    return this.result
  }
}
