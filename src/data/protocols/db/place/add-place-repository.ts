import { SavePlace } from '@/domain/usecases'

export interface AddPlaceRepository {
  add (params: AddPlaceRepository.Params): Promise<AddPlaceRepository.Model>
}

export namespace AddPlaceRepository {
  export type Params = {
    name: string
  }
  export type Model = SavePlace.Model
}
