export interface CheckSectorById {
  checkById (id: string): Promise<CheckSectorById.Result>
}

export namespace CheckSectorById {
  export type Result = boolean
}
