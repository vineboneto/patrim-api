export interface CheckAccountById {
  checkById (params: CheckAccountById.Params): Promise<CheckAccountById.Result>
}

export namespace CheckAccountById {
  export type Params = {
    id: number
  }
  export type Result = boolean
}
