export interface CheckCategoryByIdRepository {
  checkById (id: string | number): Promise<CheckCategoryByIdRepository.Result>
}

export namespace CheckCategoryByIdRepository {
  export type Result = boolean
}
