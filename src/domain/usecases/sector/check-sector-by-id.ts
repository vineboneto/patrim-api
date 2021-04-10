export interface CheckSectorById {
  checkById (id: number): Promise<CheckSectorById.Result>
}

export namespace CheckSectorById {
  export type Result = boolean
}
