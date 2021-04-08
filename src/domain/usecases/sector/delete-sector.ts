export interface DeleteSector {
  delete (id: number): Promise<DeleteSector.Result>
}

export namespace DeleteSector {
  export type Result = boolean
}
