export interface CheckAccessDataRepository {
  checkAccess (params: CheckAccessDataRepository.Params): Promise<boolean>
}

export namespace CheckAccessDataRepository {
  export type Params = {
    id: number
    accountId: number
  }
}
