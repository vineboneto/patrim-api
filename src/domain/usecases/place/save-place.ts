export interface SavePlace {
  save (params: SavePlace.Params): Promise<SavePlace.Model>
}

export namespace SavePlace {
  export type Params = {
    id?: number
    name: string
  }
  export type Model = {
    id: number
    name: string
  }
}