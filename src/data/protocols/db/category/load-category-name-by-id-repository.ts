export interface LoadCategoryNameByIdRepository {
  loadNameById (id: number): Promise<LoadCategoryNameByIdRepository.Model>
}

export namespace LoadCategoryNameByIdRepository {
  export type Model = {
    name: string
  }
}
