export interface CheckAccessData {
  checkAccess (params: CheckAccessData.Params): Promise<boolean>
}

export namespace CheckAccessData {
  export type Params = {
    accountId: number
    dataAccess: DataAccess[]
  }

  export type DataAccess = {
    databaseName: string
    id: number
  }
}
