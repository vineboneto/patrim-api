export interface LoadSectors {
  load (): Promise<LoadSectors.Model>
}

export namespace LoadSectors {
  export type SectorModel = {
    id: number
    name: string
  }

  export type Model = SectorModel[]
}
