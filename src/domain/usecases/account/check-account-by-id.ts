export interface CheckAccountById {
  checkById (id: number): Promise<CheckAccountById.Result>
}

export namespace CheckAccountById {
  export type Result = boolean
}
