export interface CheckPlaceById {
  checkById (params: CheckPlaceById.Params): Promise<CheckPlaceById.Result>
}

export namespace CheckPlaceById {
  export type Params = {
    id: number
  }
  export type Result = boolean
}
