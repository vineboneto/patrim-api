export interface LoadSectorNameByIdRepository {
  loadNameById (id: number): Promise<LoadSectorNameByIdRepository.Model>
}

export namespace LoadSectorNameByIdRepository {
  export type Model = {
    name: string
  }
}
