export interface CheckSectorByIdRepository {
  checkById (id: string): Promise<CheckSectorByIdRepository.Result>
}

export namespace CheckSectorByIdRepository {
  export type Result = boolean
}
