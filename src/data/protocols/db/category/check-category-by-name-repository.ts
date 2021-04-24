export interface CheckCategoryByNameRepository {
  checkByName (params: CheckCategoryByNameRepository.Params): Promise<boolean>
}

export namespace CheckCategoryByNameRepository {
  export type Params = {
    name: string
    accountId: number
  }
}
