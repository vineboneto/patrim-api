import { DeletePlace } from '@/domain/usecases'

export interface DeletePlaceRepository {
  delete (params: DeletePlaceRepository.Params): Promise<DeletePlaceRepository.Model>
}

export namespace DeletePlaceRepository {
  export type Params = DeletePlace.Params
  export type Model = DeletePlace.Model
}
