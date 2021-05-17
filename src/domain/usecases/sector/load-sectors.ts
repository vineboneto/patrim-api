import { SectorModel } from '@/domain/models'

export interface LoadSectors {
  load (params: LoadSectors.Params): Promise<LoadSectors.Model>
}

export namespace LoadSectors {
  export type Params = {
    accountId: number
    skip?: number
    take?: number
  }

  export type Model = {
    model: SectorModel[]
    count: number
  }
}
