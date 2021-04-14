export interface UpdateSectorRepository {
  update: (sector: UpdateSectorRepository.Params) => Promise<UpdateSectorRepository.Result>
}

export namespace UpdateSectorRepository {
  export type Params = {
    id: string | number
    name: string
  }
  export type Result = boolean
}
