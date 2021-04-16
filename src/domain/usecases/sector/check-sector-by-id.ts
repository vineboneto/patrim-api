export interface CheckSectorById {
  checkById (params: CheckSectorById.Params): Promise<CheckSectorById.Result>
}

export namespace CheckSectorById {
  export type Params = {
    id: number
  }
  export type Result = boolean
}
