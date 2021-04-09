export interface DeleteSectorRepository {
  delete (id: number): Promise<DeleteSectorRepository.Result>
}

export namespace DeleteSectorRepository {
  export type Result = boolean
}
