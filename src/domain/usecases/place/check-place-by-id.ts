export interface CheckPlaceById {
  checkById (id: number): Promise<CheckPlaceById.Result>
}

export namespace CheckPlaceById {
  export type Result = boolean
}
