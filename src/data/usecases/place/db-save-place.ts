import { SavePlace } from '@/domain/usecases'
import { CheckPlaceByNameRepository } from '@/data/protocols'

export class DbSavePlace implements SavePlace {
  constructor (
    private readonly checkPlaceByNameRepository: CheckPlaceByNameRepository
  ) {}

  async save (place: SavePlace.Params): Promise<SavePlace.Result> {
    const { name } = place
    const exists = await this.checkPlaceByNameRepository.checkByName(name)
    return !exists
  }
}
