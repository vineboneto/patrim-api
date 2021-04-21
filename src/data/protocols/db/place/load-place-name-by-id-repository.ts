export interface LoadPlaceNameByIdRepository {
  loadNameById (id: number): Promise<LoadPlaceNameByIdRepository.Model>
}

export namespace LoadPlaceNameByIdRepository {
  export type Model = {
    name: string
  }
}
