import { AddAccountPlace } from '@/domain/usecases'
import { AddAccountPlaceRepository } from '@/data/protocols'

export class DbAddAccountPlace implements AddAccountPlace {
  constructor (
    private readonly addAccountPlaceRepository: AddAccountPlaceRepository
  ) {}

  async add (params: AddAccountPlace.Params): Promise<AddAccountPlace.Model> {
    return this.addAccountPlaceRepository.add(params)
  }
}
