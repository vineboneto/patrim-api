import { AddAccountPlace } from '@/domain/usecases'

export interface AddAccountPlaceRepository {
  add (params: AddAccountPlaceRepository.Params): Promise<AddAccountPlaceRepository.Model>
}

export namespace AddAccountPlaceRepository {
  export type Params = AddAccountPlace.Params
  export type Model = AddAccountPlace.Model
}
