import { SectorModel } from '@/domain/models'

export interface LoadSectors {
  load (): Promise<LoadSectors.Result>
}

export namespace LoadSectors {
  export type Result = SectorModel[]
}
