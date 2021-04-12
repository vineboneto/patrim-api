export interface SaveCategory {
  save (SaveCategory: SaveCategory.Params): Promise<SaveCategory.Result>
}

export namespace SaveCategory {
  export type Params = {
    id?: string
    name: string
  }

  export type Result = boolean
}
