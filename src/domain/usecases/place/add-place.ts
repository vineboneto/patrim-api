import { PlaceModel } from '@/domain/models'

export interface AddPlace {
  add (params: AddPlace.Params): Promise<AddPlace.Model>
}

export namespace AddPlace {
  export type Params = {
    name: string
  }
  export type Model = PlaceModel
}
