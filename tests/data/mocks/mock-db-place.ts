import { AddPlaceRepository } from '@/data/protocols'
import { SavePlace } from '@/domain/usecases'
import { mockPlaceModel } from '@/tests/domain/mocks'

import faker from 'faker'

export const mockAddPlaceRepositoryParams = (): SavePlace.Params => ({
  name: faker.name.findName()
})

export class AddOPlaceRepositorySpy implements AddPlaceRepository {
  params: AddPlaceRepository.Params
  model = mockPlaceModel()
  async add (params: AddPlaceRepository.Params): Promise<AddPlaceRepository.Model> {
    this.params = params
    return this.model
  }
}
