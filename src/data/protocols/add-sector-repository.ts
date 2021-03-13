import { AddSector } from '@/domain/usecases'

export interface AddSectorRepository {
  addSector: (sector: AddSectorRepository.Params) => Promise<AddSectorRepository.Result>
}

export namespace AddSectorRepository {
  export type Params = AddSector.Params
  export type Result = AddSector.Result
}
