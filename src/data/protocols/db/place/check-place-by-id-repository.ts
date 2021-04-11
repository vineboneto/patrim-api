export interface CheckPlaceByIdRepository {
  checkById (id: string): Promise<CheckPlaceByIdRepository.Result>
}

export namespace CheckPlaceByIdRepository {
  export type Result = boolean
}
