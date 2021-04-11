export interface CheckAccountById {
  checkById (id: string): Promise<CheckAccountById.Result>
}

export namespace CheckAccountById {
  export type Result = boolean
}
