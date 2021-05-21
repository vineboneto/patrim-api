import { SectorModel } from '@/domain/models'

export interface DeleteSector {
  delete (params: DeleteSector.Params): Promise<DeleteSector.Model>
}

export namespace DeleteSector {
  export type Params = {
    id: number
  }

  export type Model = SectorModel
}
