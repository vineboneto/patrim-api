import { UpdatePlace } from '@/domain/usecases'

export interface UpdatePlaceRepository {
  update (params: UpdatePlaceRepository.Params): Promise<UpdatePlaceRepository.Model>
}

export namespace UpdatePlaceRepository {
  export type Params = UpdatePlace.Params
  export type Model = UpdatePlace.Model
}
