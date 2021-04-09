export interface CheckSectorByIdRepository {
  checkById (id: number): Promise<CheckSectorByIdRepository.Result>
}

export namespace CheckSectorByIdRepository {
  export type Result = boolean
}
