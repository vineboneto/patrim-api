import { UpdateSector } from '@/domain/usecases'

export interface UpdateSectorRepository {
  update: (sector: UpdateSectorRepository.Params) => Promise<UpdateSectorRepository.Model>
}

export namespace UpdateSectorRepository {
  export type Params = UpdateSector.Params
  export type Model = UpdateSector.Model
}
