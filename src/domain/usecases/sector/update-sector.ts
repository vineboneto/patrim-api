import { SectorModel } from '@/domain/models'

export interface UpdateSector {
  update (params: UpdateSector.Params): Promise<UpdateSector.Model>
}

export namespace UpdateSector {
  export type Params = {
    id: number
    name: string
  }

  export type Model = SectorModel
}
