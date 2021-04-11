export interface LoadPlaces {
  load (): Promise<LoadPlaces.Model>
}

export namespace LoadPlaces {
  export type Model = PlaceModel[]

  export type PlaceModel = {
    id: string
    name: string
    userId: string
  }
}
