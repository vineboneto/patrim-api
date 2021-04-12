export interface LoadAccountByEmailRepository {
  loadByEmail (email: string): Promise<LoadAccountByEmailRepository.Model>
}

export namespace LoadAccountByEmailRepository {
  export type Model = {
    id: string
    name: string
    password: string
  }
}
