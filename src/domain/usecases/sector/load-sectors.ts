import { SectorModel } from '@/domain/models'

export interface LoadSectors {
  load (): Promise<LoadSectors.Model>
}

export namespace LoadSectors {
  export type Model = SectorModel[]
}
