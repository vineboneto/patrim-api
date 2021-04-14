export interface CheckSectorById {
  checkById (id: string | number): Promise<CheckSectorById.Result>
}

export namespace CheckSectorById {
  export type Result = boolean
}
