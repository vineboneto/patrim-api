import {
  CheckPlaceByNameRepository,
  LoadPlaceNameByIdRepository,
  UpdatePlaceRepository
} from '@/data/protocols'
import { UpdatePlace } from '@/domain/usecases'

export class DbUpdatePlace implements UpdatePlace {
  constructor (
    private readonly updatePlaceRepository: UpdatePlaceRepository,
    private readonly loadPlaceNameByIdRepository: LoadPlaceNameByIdRepository,
    private readonly checkPlaceByNameRepository: CheckPlaceByNameRepository
  ) {}

  async update (params: UpdatePlace.Params): Promise<UpdatePlace.Model> {
    const { name } = await this.loadPlaceNameByIdRepository.loadNameById(params.id)
    if (name !== params.name) {
      const exists = await this.checkPlaceByNameRepository.checkByName(params.name)
      if (exists) {
        return null
      }
    }
    return this.updatePlaceRepository.update(params)
  }
}
