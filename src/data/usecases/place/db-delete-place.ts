import { DeletePlace } from '@/domain/usecases'
import { CheckPatrimonyByPlaceIdRepository, DeletePlaceRepository } from '@/data/protocols'

export class DbDeletePlace implements DeletePlace {
  constructor (
    private readonly deletePlaceRepository: DeletePlaceRepository,
    private readonly checkPatrimonyByPlaceId: CheckPatrimonyByPlaceIdRepository
  ) {}

  async delete (params: DeletePlace.Params): Promise<DeletePlace.Model> {
    const exists = await this.checkPatrimonyByPlaceId.checkByPlaceId({ placeId: params.id })
    if (!exists) {
      return this.deletePlaceRepository.delete(params)
    }
    return null
  }
}
