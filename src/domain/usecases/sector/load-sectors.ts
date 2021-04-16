import { SectorModel } from '@/domain/models'

export interface LoadSectors {
  load (params: LoadSectors.Params): Promise<LoadSectors.Model>
}

export namespace LoadSectors {
  export type Params = {
    skip?: number
    take?: number
  }

  export type Model = SectorModel[]
}
