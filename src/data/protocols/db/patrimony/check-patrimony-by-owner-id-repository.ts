export interface CheckPatrimonyByOwnerIdRepository {
  checkByOwnerId (params: CheckPatrimonyByOwnerIdRepository.Params): Promise<CheckPatrimonyByOwnerIdRepository.Result>
}

export namespace CheckPatrimonyByOwnerIdRepository {
  export type Params = {
    ownerId: number
    accountId: number
  }
  export type Result = boolean
}
