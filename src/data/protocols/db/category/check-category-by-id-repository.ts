export interface CheckCategoryByIdRepository {
  checkById (id: number): Promise<CheckCategoryByIdRepository.Result>
}

export namespace CheckCategoryByIdRepository {
  export type Result = boolean
}
