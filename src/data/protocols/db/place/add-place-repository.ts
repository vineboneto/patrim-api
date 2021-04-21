import { AddPlace } from '@/domain/usecases'

export interface AddPlaceRepository {
  add (params: AddPlaceRepository.Params): Promise<AddPlaceRepository.Model>
}

export namespace AddPlaceRepository {
  export type Params = AddPlace.Params
  export type Model = AddPlace.Model
}
