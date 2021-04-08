export interface LoadSectors {
  load (): Promise<LoadSectors.Result>
}

export namespace LoadSectors {
  type SectorModel = {
    id: number
    name: string
  }

  export type Result = SectorModel[]
}
