export interface UpdateCategoryRepository {
  update: (category: UpdateCategoryRepository.Params) => Promise<UpdateCategoryRepository.Result>
}

export namespace UpdateCategoryRepository {
  export type Params = {
    id: number
    name: string
  }
  export type Result = boolean
}
