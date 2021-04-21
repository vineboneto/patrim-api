import { SectorModel } from '@/domain/models'

export interface AddSector {
  add (params: AddSector.Params): Promise<AddSector.Model>
}

export namespace AddSector {
  export type Params = {
    name: string
  }

  export type Model = SectorModel
}
