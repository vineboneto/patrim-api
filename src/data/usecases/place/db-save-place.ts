import { SavePlace } from '@/domain/usecases'
import { AddPlaceRepository } from '@/data/protocols'

export class DbSavePlace implements SavePlace {
  constructor (
    private readonly addPlaceRepository: AddPlaceRepository
  ) {}

  async save (params: SavePlace.Params): Promise<SavePlace.Model> {
    const { name } = params
    await this.addPlaceRepository.add({ name })
    return null
  }
}
