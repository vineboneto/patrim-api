import { AddAccountPlaceRepository } from '@/data/protocols'
import { mockAccountPlaceModel, mockAddAccountPlaceParams } from '@/tests/domain/mocks'

export const mockAddAccountPlaceRepositoryParams = ():
AddAccountPlaceRepository.Params => mockAddAccountPlaceParams()

export class AddAccountPlaceRepositorySpy implements AddAccountPlaceRepository {
  params: AddAccountPlaceRepository.Params
  model = mockAccountPlaceModel()
  async add (params: AddAccountPlaceRepository.Params): Promise<AddAccountPlaceRepository.Model> {
    this.params = params
    return this.model
  }
}
