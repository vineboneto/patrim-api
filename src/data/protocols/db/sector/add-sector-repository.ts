import { SaveSector } from '@/domain/usecases'

export interface AddSectorRepository {
  add: (sector: AddSectorRepository.Params) => Promise<AddSectorRepository.Model>
}

export namespace AddSectorRepository {
  export type Params = {
    name: string
  }
  export type Model = SaveSector.Model
}
