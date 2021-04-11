export interface AddPlaceRepository {
  add: (place: AddPlaceRepository.Params) => Promise<AddPlaceRepository.Result>
}

export namespace AddPlaceRepository {
  export type Params = {
    name: string
    userId?: number
  }
  export type Result = boolean
}
