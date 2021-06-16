export interface CheckAccessData {
  checkAccess (params: CheckAccessData.Params): Promise<boolean>
}

export namespace CheckAccessData {
  export type Params = {
    accountId: number
    databaseName: string
    id: number
  }
}
