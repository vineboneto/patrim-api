export interface CheckPlaceByIdRepository {
  checkById (id: number): Promise<CheckPlaceByIdRepository.Result>
}

export namespace CheckPlaceByIdRepository {
  export type Result = boolean
}
