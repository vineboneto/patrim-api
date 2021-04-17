import { DeletePlace } from '@/domain/usecases'
import { DeletePlaceRepository } from '@/data/protocols'

export class DbDeletePlace implements DeletePlace {
  constructor (
    private readonly deletePlaceRepository: DeletePlaceRepository
  ) {}

  async delete (params: DeletePlace.Params): Promise<DeletePlace.Model> {
    return this.deletePlaceRepository.delete(params)
  }
}
