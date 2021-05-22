import { SectorModel } from '@/domain/models'

export interface LoadSectorById {
  loadById (params: LoadSectorById.Params): Promise<LoadSectorById.Model>
}

export namespace LoadSectorById {
  export type Params = {
    id: number
    accountId: number
  }
  export type Model = SectorModel
}
