export interface CheckSectorByNameRepository {
  checkByName (name: CheckSectorByNameRepository.Params): Promise<boolean>
}

export namespace CheckSectorByNameRepository {
  export type Params = {
    name: string
    accountId: number
  }
}
