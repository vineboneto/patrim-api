import { AddPlaceRepository, UpdatePlaceRepository } from '@/data/protocols'
import { mockPlaceModel } from '@/tests/domain/mocks'

import faker from 'faker'

export const mockAddPlaceRepositoryParams = (): AddPlaceRepository.Params => ({
  name: faker.name.findName()
})

export const mockUpdatePlaceRepositoryParams = (): UpdatePlaceRepository.Params => ({
  id: faker.datatype.number(),
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

export class UpdatePlaceRepositorySpy implements UpdatePlaceRepository {
  params: UpdatePlaceRepository.Params
  model = mockPlaceModel()
  async update (params: UpdatePlaceRepository.Params): Promise<UpdatePlaceRepository.Model> {
    this.params = params
    return this.model
  }
}
