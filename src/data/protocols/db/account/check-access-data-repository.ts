export interface CheckAccessDataRepository {
  checkAccess (params: CheckAccessDataRepository.Params): Promise<boolean>
}

export namespace CheckAccessDataRepository {
  export type Params = {
    accountId: number
    databaseName: string
    id: number
  }
}
