export interface CheckOwnerBySectorIdRepository {
  checkBySectorId (params: CheckOwnerBySectorIdRepository.Params): Promise<CheckOwnerBySectorIdRepository.Result>
}

export namespace CheckOwnerBySectorIdRepository {
  export type Params = {
    sectorId: number
  }
  export type Result = boolean
}