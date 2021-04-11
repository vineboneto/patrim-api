export interface CheckPlaceByNameRepository {
  checkByName (name: string): Promise<CheckPlaceByNameRepository.Result>
}

export namespace CheckPlaceByNameRepository {
  export type Result = boolean
}
