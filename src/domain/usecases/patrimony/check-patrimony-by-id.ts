export interface CheckPatrimonyById {
  checkById (params: CheckPatrimonyById.Params): Promise<CheckPatrimonyById.Result>
}

export namespace CheckPatrimonyById {
  export type Params = {
    id: number
  }
  export type Result = boolean
}
