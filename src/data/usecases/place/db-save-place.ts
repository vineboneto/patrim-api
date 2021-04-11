import { SavePlace } from '@/domain/usecases'
import { CheckPlaceByNameRepository, UpdatePlaceRepository } from '@/data/protocols'

export class DbSavePlace implements SavePlace {
  constructor (
    private readonly checkPlaceByNameRepository: CheckPlaceByNameRepository,
    private readonly updatePlaceRepository: UpdatePlaceRepository
  ) {}

  async save (place: SavePlace.Params): Promise<SavePlace.Result> {
    const { id, name, userId } = place
    const exists = await this.checkPlaceByNameRepository.checkByName(name)
    let isValid = false
    if (!exists) {
      if (id) {
        isValid = await this.updatePlaceRepository.update({ id, name, userId })
      }
    }
    return isValid
  }
}
