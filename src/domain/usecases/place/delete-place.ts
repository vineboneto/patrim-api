import { PlaceModel } from '@/domain/models'

export interface DeletePlace {
  delete(params: DeletePlace.Params): Promise<DeletePlace.Model>
}

export namespace DeletePlace {
  export type Params = {
    id: number
  }
  export type Model = PlaceModel
}
