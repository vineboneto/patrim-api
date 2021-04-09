export interface LoadSectorByIdRepository {
  loadById (id: number): Promise<LoadSectorByIdRepository.Model>
}

export namespace LoadSectorByIdRepository {
  export type Model = {
    id: number
  }
}
