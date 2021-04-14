export interface SaveSector {
  save (SaveSector: SaveSector.Params): Promise<SaveSector.Result>
}

export namespace SaveSector {
  export type Params = {
    id?: string | number
    name: string
  }

  export type Result = boolean
}
