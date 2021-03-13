export interface CheckSectorByName {
  checkByName: (name: string) => Promise<CheckSectorByName.Result>
}

export namespace CheckSectorByName {
  export type Result = boolean
}
