import { SavePlace } from '@/domain/usecases'

export interface UpdatePlaceRepository {
  update (params: UpdatePlaceRepository.Params): Promise<UpdatePlaceRepository.Model>
}

export namespace UpdatePlaceRepository {
  export type Params = {
    id: number
    name: string
  }
  export type Model = SavePlace.Model
}
