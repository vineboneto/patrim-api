export interface SavePlace {
  save (place: SavePlace.Params): Promise<SavePlace.Result>
}

export namespace SavePlace {
  export type Params = {
    id?: number
    name: string
    userId?: number
  }

  export type Result = boolean
}
