import { CheckPlaceByNameRepository, UpdatePlaceRepository } from '@/data/protocols'
import { SavePlace } from '@/domain/usecases'

import faker from 'faker'

export const mockAddPlaceParams = (): SavePlace.Params => ({
  name: faker.name.findName(),
  userId: faker.datatype.number()
})

export const mockUpdatePlaceParams = (): UpdatePlaceRepository.Params => ({
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

export class UpdatePlaceRepositorySpy implements UpdatePlaceRepository {
  callsCount = 0
  params: UpdatePlaceRepository.Params
  result = true
  async update (place: UpdatePlaceRepository.Params): Promise<UpdatePlaceRepository.Result> {
    this.callsCount++
    this.params = place
    return this.result
  }
}
