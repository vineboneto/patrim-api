export interface CheckUserIdRepository {
  checkUserId (params: CheckUserIdRepository.Params): Promise<CheckUserIdRepository.Model>
}

export namespace CheckUserIdRepository {
  export type Params = {
    id: number
    fieldDatabase: string
  }
  export type Model = boolean
}
