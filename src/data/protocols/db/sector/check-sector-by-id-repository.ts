export interface CheckSectorByIdRepository {
  checkById (id: string | number): Promise<CheckSectorByIdRepository.Result>
}

export namespace CheckSectorByIdRepository {
  export type Result = boolean
}
