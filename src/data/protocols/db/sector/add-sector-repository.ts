import { SaveSector } from '@/domain/usecases'

export interface AddSectorRepository {
  add: (sector: AddSectorRepository.Params) => Promise<AddSectorRepository.Result>
}

export namespace AddSectorRepository {
  export type Params = {
    name: string
  }
  export type Result = SaveSector.Result
}
