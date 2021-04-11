import { SavePlace } from '@/domain/usecases'
import { AddPlaceRepository, CheckPlaceByNameRepository, UpdatePlaceRepository } from '@/data/protocols'

export class DbSavePlace implements SavePlace {
  constructor (
    private readonly checkPlaceByNameRepository: CheckPlaceByNameRepository,
    private readonly updatePlaceRepository: UpdatePlaceRepository,
    private readonly addPlaceRepository: AddPlaceRepository
  ) {}

  async save (place: SavePlace.Params): Promise<SavePlace.Result> {
    const { id, name, userId } = place
    const exists = await this.checkPlaceByNameRepository.checkByName(name)
    let isValid = false
    if (!exists) {
      id
        ? isValid = await this.updatePlaceRepository.update({ id, name, userId })
        : isValid = await this.addPlaceRepository.add({ name, userId })
    }
    return isValid
  }
}
