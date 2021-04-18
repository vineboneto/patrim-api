import { LoadPlaces } from '@/domain/usecases'
import { LoadPlacesRepository } from '@/data/protocols'

export class DbLoadPlaces implements LoadPlaces {
  constructor (
    private readonly loadPlaceRepository: LoadPlacesRepository
  ) {}

  async load (params: LoadPlaces.Params): Promise<LoadPlaces.Model> {
    return this.loadPlaceRepository.loadAll(params)
  }
}