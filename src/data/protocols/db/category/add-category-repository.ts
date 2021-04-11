export interface AddCategoryRepository {
  add: (category: AddCategoryRepository.Params) => Promise<AddCategoryRepository.Result>
}

export namespace AddCategoryRepository {
  export type Params = {
    name: string
  }
  export type Result = boolean
}
