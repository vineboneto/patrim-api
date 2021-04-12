export interface CheckCategoryById {
  checkById (id: string): Promise<CheckCategoryById.Result>
}

export namespace CheckCategoryById {
  export type Result = boolean
}
