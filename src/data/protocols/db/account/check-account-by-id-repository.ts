export interface CheckAccountByIdRepository {
  checkById (id: number): Promise<CheckAccountByIdRepository.Result>
}

export namespace CheckAccountByIdRepository {
  export type Result = boolean
}
