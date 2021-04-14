export interface CheckOwnerById {
  checkById (id: string | number): Promise<CheckOwnerById.Result>
}

export namespace CheckOwnerById {
  export type Result = boolean
}
