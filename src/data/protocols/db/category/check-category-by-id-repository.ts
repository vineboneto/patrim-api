export interface CheckCategoryByIdRepository {
  checkById (id: string): Promise<CheckCategoryByIdRepository.Result>
}

export namespace CheckCategoryByIdRepository {
  export type Result = boolean
}
