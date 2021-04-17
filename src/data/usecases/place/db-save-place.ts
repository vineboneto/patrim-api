import { SavePlace } from '@/domain/usecases'
import { AddPlaceRepository, UpdatePlaceRepository } from '@/data/protocols'

export class DbSavePlace implements SavePlace {
  constructor (
    private readonly addPlaceRepository: AddPlaceRepository,
    private readonly updatePlaceRepository: UpdatePlaceRepository
  ) {}

  async save (params: SavePlace.Params): Promise<SavePlace.Model> {
    const { id, name } = params
    await this.updatePlaceRepository.update({ id, name })
    return this.addPlaceRepository.add({ name })
  }
}
