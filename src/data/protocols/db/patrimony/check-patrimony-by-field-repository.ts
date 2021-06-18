export interface CheckPatrimonyByFieldRepository {
  checkByField (params: CheckPatrimonyByFieldRepository.Params): Promise<boolean>
}

export namespace CheckPatrimonyByFieldRepository {
  export type Params = {
    value: any
    accountId: number
  }
}
