export interface AddSector {
  add: (sector: Params) => Promise<Result>
}

export type Params = {
  name: string
}

export type Result = boolean
