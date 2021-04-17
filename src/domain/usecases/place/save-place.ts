export interface SavePlace {
  save (params: SavePlace.Request): Promise<SavePlace.Model>
}

export namespace SavePlace {
  export type Request = {
    id?: number
    name: string
  }
  export type Model = {
    id: number
    name: string
  }
}
