export interface SaveOwner {
  save (params: SaveOwner.Params): Promise<SaveOwner.Model>
}

export namespace SaveOwner {
  export type Params = {
    id?: string | number
    name: string
    sectorId: string
  }

  export type Model = {
    id: string | number
    name: string
    sectorId: string | number
  }
}
