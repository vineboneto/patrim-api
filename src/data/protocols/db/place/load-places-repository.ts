import { LoadPlaces } from '@/domain/usecases'

export interface LoadPlacesRepository {
  loadAll (): Promise<LoadPlacesRepository.Model>
}

export namespace LoadPlacesRepository {
  export type Model = LoadPlaces.Model
}
