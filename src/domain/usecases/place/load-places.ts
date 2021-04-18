import { PlaceModel } from '@/domain/models'

export interface LoadPlaces {
  load (params: LoadPlaces.Params): Promise<LoadPlaces.Model>
}

export namespace LoadPlaces {
  export type Params = {
    skip?: number
    take?: number
  }

  export type Model = PlaceModel[]
}
