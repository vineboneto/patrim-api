export interface AddPlaceRepository {
  add: (place: AddPlaceRepository.Params) => Promise<AddPlaceRepository.Result>
}

export namespace AddPlaceRepository {
  export type Params = {
    name: string
    userId?: string
  }
  export type Result = boolean
}
