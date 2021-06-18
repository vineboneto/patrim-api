export interface CheckAccessDataRepository {
  checkAccess (params: CheckAccessDataRepository.Params): Promise<boolean>
}

export namespace CheckAccessDataRepository {
  export type Params = {
    accountId: number
    templateAccess: Template
  }

  export type Template = {
    databaseName: string
    id: number
  }
}
