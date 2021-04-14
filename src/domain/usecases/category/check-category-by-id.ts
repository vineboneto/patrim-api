export interface CheckCategoryById {
  checkById (id: string | number): Promise<CheckCategoryById.Result>
}

export namespace CheckCategoryById {
  export type Result = boolean
}
