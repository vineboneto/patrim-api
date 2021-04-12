export interface SaveOwner {
  save (params: SaveOwner.Params): Promise<SaveOwner.Model>
}

export namespace SaveOwner {
  export type Params = {
    id?: string
    name: string
    sectorId: string
  }

  export type Model = {
    id: string
    name: string
    sectorId: string
  }
}
