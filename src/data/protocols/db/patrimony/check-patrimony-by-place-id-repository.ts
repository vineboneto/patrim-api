export interface CheckPatrimonyByPlaceIdRepository {
  checkByPlaceId (params: CheckPatrimonyByPlaceIdRepository.Params):
  Promise<CheckPatrimonyByPlaceIdRepository.Result>
}

export namespace CheckPatrimonyByPlaceIdRepository {
  export type Params = {
    placeId: number
  }
  export type Result = boolean
}
