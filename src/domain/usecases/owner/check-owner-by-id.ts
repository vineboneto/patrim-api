export interface CheckOwnerById {
  checkById (params: CheckOwnerById.Params): Promise<CheckOwnerById.Result>
}

export namespace CheckOwnerById {
  export type Params = {
    id: number
  }
  export type Result = boolean
}
