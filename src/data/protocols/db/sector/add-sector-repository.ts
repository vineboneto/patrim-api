import { AddSector } from '@/domain/usecases/'

export interface AddSectorRepository {
  addSector: (sector: AddSectorRepository.Params) => Promise<AddSectorRepository.Model>
}

export namespace AddSectorRepository {
  export type Params = AddSector.Params
  export type Model = AddSector.Model
}
