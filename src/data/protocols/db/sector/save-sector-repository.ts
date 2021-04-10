import { SaveSector } from '@/domain/usecases'

export interface SaveSectorRepository {
  save: (sector: SaveSectorRepository.Params) => Promise<SaveSectorRepository.Result>
}

export namespace SaveSectorRepository {
  export type Params = SaveSector.Params
  export type Result = SaveSector.Result
}
