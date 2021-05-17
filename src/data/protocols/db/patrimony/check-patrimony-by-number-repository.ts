export interface CheckPatrimonyByNumberRepository {
  checkByNumber (params: CheckPatrimonyByNumberRepository.Params): Promise<boolean>
}

export namespace CheckPatrimonyByNumberRepository {
  export type Params = {
    number: string
    accountId: number
  }
}
