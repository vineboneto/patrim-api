import { SectorModel } from '@/domain/models'

export interface SaveSector {
  save (SaveSector: SaveSector.Params): Promise<SaveSector.Model>
}

export namespace SaveSector {
  export type Params = {
    id?: number
    name: string
  }

  export type Model = SectorModel
}
