import { PlaceModel } from '@/domain/models'

export interface UpdatePlace {
  update (params: UpdatePlace.Params): Promise<UpdatePlace.Model>
}

export namespace UpdatePlace {
  export type Params = {
    id: number
    name: string
  }

  export type Model = PlaceModel
}
