export interface UpdatePlaceRepository {
  update(place: UpdatePlaceRepository.Params): Promise<UpdatePlaceRepository.Result>
}

export namespace UpdatePlaceRepository {
  export type Params = {
    id: number
    name: string
    userId?: number
  }
  export type Result = boolean
}
