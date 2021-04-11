export interface UpdatePlaceRepository {
  update(place: UpdatePlaceRepository.Params): Promise<UpdatePlaceRepository.Result>
}

export namespace UpdatePlaceRepository {
  export type Params = {
    id: string
    name: string
    userId?: string
  }
  export type Result = boolean
}
