export interface CheckPlaceById {
  checkById (id: string): Promise<CheckPlaceById.Result>
}

export namespace CheckPlaceById {
  export type Result = boolean
}
