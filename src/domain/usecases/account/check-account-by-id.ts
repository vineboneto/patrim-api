export interface CheckAccountById {
  checkById (id: string | number): Promise<CheckAccountById.Result>
}

export namespace CheckAccountById {
  export type Result = boolean
}
