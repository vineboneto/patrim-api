import { LoadPlaces } from '@/domain/usecases'
import { LoadPlacesRepository } from '@/data/protocols'

export class DbLoadPlaces implements LoadPlaces {
  constructor (
    private readonly loadPlacesRepository: LoadPlacesRepository
  ) {}

  async load (): Promise<LoadPlaces.Model> {
    return this.loadPlacesRepository.loadAll()
  }
}
