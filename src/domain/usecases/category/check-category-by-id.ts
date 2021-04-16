export interface CheckCategoryById {
  checkById (params: CheckCategoryById.Params): Promise<CheckCategoryById.Result>
}

export namespace CheckCategoryById {
  export type Params = {
    id: number
  }
  export type Result = boolean
}
