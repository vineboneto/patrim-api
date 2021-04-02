import { SectorModel } from '@/domain/models'

export interface AddSector {
  add (sector: AddSector.Params): Promise<AddSector.Result>
}

export namespace AddSector {
  export type Params = SectorModel

  export type Result = boolean
}
