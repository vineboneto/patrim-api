import { AddPlace } from '@/domain/usecases'
import { AddPlaceRepository, CheckPlaceByNameRepository } from '@/data/protocols'

export class DbAddPlace implements AddPlace {
  constructor (
    private readonly addPlaceRepository: AddPlaceRepository,
    private readonly checkPlaceByNameRepository: CheckPlaceByNameRepository
  ) {}

  async add (params: AddPlace.Params): Promise<AddPlace.Model> {
    const exists = await this.checkPlaceByNameRepository.checkByName(params.name)
    if (!exists) {
      return this.addPlaceRepository.add(params)
    }
    return null
  }
}
