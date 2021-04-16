import { SaveSector } from '@/domain/usecases'

export interface UpdateSectorRepository {
  update: (sector: UpdateSectorRepository.Params) => Promise<UpdateSectorRepository.Model>
}

export namespace UpdateSectorRepository {
  export type Params = {
    id: number
    name: string
  }
  export type Model = SaveSector.Model
}
