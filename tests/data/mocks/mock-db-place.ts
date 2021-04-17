import {
  AddPlaceRepository,
  CheckPlaceByIdRepository,
  CheckPlaceByNameRepository,
  DeletePlaceRepository,
  UpdatePlaceRepository
} from '@/data/protocols'
import { mockCheckPlaceByIdParams, mockDeletePlaceParams, mockPlaceModel } from '@/tests/domain/mocks'

import faker from 'faker'

export const mockAddPlaceRepositoryParams = (): AddPlaceRepository.Params => ({
  name: faker.name.findName()
})

export const mockUpdatePlaceRepositoryParams = (): UpdatePlaceRepository.Params => ({
  id: faker.datatype.number(),
  name: faker.name.findName()
})

export const mockCheckPlaceByIdRepositoryParams = (): CheckPlaceByIdRepository.Params => mockCheckPlaceByIdParams()

export const mockDeletePlaceRepositoryParams = (): DeletePlaceRepository.Params => mockDeletePlaceParams()

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

export class DeletePlaceRepositorySpy implements DeletePlaceRepository {
  model = mockPlaceModel()
  params: DeletePlaceRepository.Params
  async delete (params: DeletePlaceRepository.Params): Promise<DeletePlaceRepository.Model> {
    this.params = params
    return this.model
  }
}

export class CheckPlaceByNameRepositorySpy implements CheckPlaceByNameRepository {
  name: string
  result = false

  async checkByName (name: string): Promise<boolean> {
    this.name = name
    return this.result
  }
}

export class CheckPlaceByIdRepositorySpy implements CheckPlaceByIdRepository {
  params: CheckPlaceByIdRepository.Params
  result = true
  async checkById (params: CheckPlaceByIdRepository.Params): Promise<CheckPlaceByIdRepository.Result> {
    this.params = params
    return this.result
  }
}
