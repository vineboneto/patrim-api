import { LoadPlaces } from '@/domain/usecases'

export interface LoadPlacesRepository {
  loadAll (params: LoadPlacesRepository.Params): Promise<LoadPlacesRepository.Model>
}

export namespace LoadPlacesRepository {
  export type Params = LoadPlaces.Params
  export type Model = LoadPlaces.Model
}
