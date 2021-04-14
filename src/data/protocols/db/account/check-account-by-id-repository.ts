export interface CheckAccountByIdRepository {
  checkById (id: string | number): Promise<CheckAccountByIdRepository.Result>
}

export namespace CheckAccountByIdRepository {
  export type Result = boolean
}
