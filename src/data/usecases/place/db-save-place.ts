import { SavePlace } from '@/domain/usecases'
import { AddPlaceRepository, CheckPlaceByNameRepository, UpdatePlaceRepository } from '@/data/protocols'

export class DbSavePlace implements SavePlace {
  constructor (
    private readonly addPlaceRepository: AddPlaceRepository,
    private readonly updatePlaceRepository: UpdatePlaceRepository,
    private readonly checkPlaceByNameRepository: CheckPlaceByNameRepository
  ) {}

  async save (params: SavePlace.Params): Promise<SavePlace.Model> {
    const { id, name } = params
    const exists = await this.checkPlaceByNameRepository.checkByName(name)
    if (!exists) {
      if (id) {
        return this.updatePlaceRepository.update({ id, name })
      }
      return this.addPlaceRepository.add({ name })
    }
    return null
  }
}
