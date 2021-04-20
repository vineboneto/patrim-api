export interface LoadPatrimonyNumberByIdRepository {
  loadNumberById (id: number): Promise<LoadPatrimonyNumberByIdRepository.Model>
}

export namespace LoadPatrimonyNumberByIdRepository {
  export type Model = {
    number: string
  }
}
