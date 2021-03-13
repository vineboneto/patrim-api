export interface AddSector {
  add: (sector: AddSector.Params) => Promise<AddSector.Result>
}

export namespace AddSector {
  export type Params = {
    name: string
  }

  export type Result = boolean
}
