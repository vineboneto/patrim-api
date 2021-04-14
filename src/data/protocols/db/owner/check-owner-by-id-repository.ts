export interface CheckOwnerByIdRepository {
  checkById (id: string | number): Promise<CheckOwnerByIdRepository.Result>
}

export namespace CheckOwnerByIdRepository {
  export type Result = boolean
}
