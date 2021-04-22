export interface AddAccountPlace {
  add (params: AddAccountPlace.Params): Promise<AddAccountPlace.Model>
}

export namespace AddAccountPlace {
  export type Params = {
    placeId: number
    accountId: number
  }
  export type Model = {
    id: number
    placeId: number
    accountId: number
  }
}
