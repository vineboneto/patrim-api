export interface LoadAccountByEmailRepository {
  loadByEmail (email: string): Promise<LoadAccountByEmailRepository.Model>
}

export namespace LoadAccountByEmailRepository {
  export type Model = {
    id: number
    name: string
    password: string
  }
}
