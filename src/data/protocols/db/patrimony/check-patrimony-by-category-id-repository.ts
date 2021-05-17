export interface CheckPatrimonyByCategoryIdRepository {
  checkByCategoryId (params: CheckPatrimonyByCategoryIdRepository.Params):
  Promise<CheckPatrimonyByCategoryIdRepository.Result>
}

export namespace CheckPatrimonyByCategoryIdRepository {
  export type Params = {
    categoryId: number
    accountId: number
  }
  export type Result = boolean
}
