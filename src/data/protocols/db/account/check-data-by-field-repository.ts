export interface CheckDataByFieldRepository {
  checkByField (params: CheckDataByFieldRepository.Params): Promise<boolean>
}

export namespace CheckDataByFieldRepository {
  export type Params = {
    value: any
    accountId: number
  }
}
