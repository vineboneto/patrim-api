export interface CheckCategoryById {
  checkById (id: number): Promise<CheckCategoryById.Result>
}

export namespace CheckCategoryById {
  export type Result = boolean
}
