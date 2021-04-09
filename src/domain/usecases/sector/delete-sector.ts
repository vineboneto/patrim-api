export interface DeleteSector {
  delete (params: DeleteSector.Params): Promise<DeleteSector.Result>
}

export namespace DeleteSector {
  export type Params = {
    id: number
  }
  export type Result = boolean
}
